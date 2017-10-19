/**
 * Description: A THREE loader for GMESH ASCII / Binary files for BEMPP.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 *  Limited support for shape types
 *
 * Usage:
 *  var loader = new GmeshLoader();
 *  loader.load( './models/stl/slotted_disk.stl', function ( geometry ) {
 *    scene.add( new THREE.Mesh( geometry ) );
 *  });
 *
 */


import {
    DefaultLoadingManager, FileLoader, BufferGeometry,
    BufferAttribute, Vector3, TextDecoder
} from 'three/src/Three';

const GMESH_VERSION = '2.2'

const GMESH_NODES_TO_READ = {
    1: 2,
    2: 3,
    3: 4,
    4: 4,
    5: 8,
    6: 6,
    7: 5,
    8: 3,
    9: 6,
    10: 9,
    11: 10,
    12: 27,
    13: 18,
    14: 14,
    15: 1,
    16: 8,
    17: 20,
    18: 15,
    19: 13,
    20: 9,
    21: 10,
    22: 12,
    23: 15,
    24: 15,
    25: 21,
    26: 4,
    27: 5,
    28: 6,
    29: 20,
    30: 35,
    31: 56,
    92: 65,
    93: 125
}

enum FILE_TYPES {
    ASCII = 0,
    BINARY = 1
}

enum ENDIANNESS {
    NONE = 0,
    BIG_ENDIAN = 1,
    LITTLE_ENDIAN = 2
}
interface GmeshHeader {
    /**
     * Version of the Gmesh format.
     * Must be 2.2
     */
    version_number: string;

    /**
     * Is this file ASCII or Binary
     */
    ASCII: boolean;

    /**
     * Data size of the floating point values.
     * They are always 8 byte doubles in the current version.
     */
    data_size: number; // Always 8

    endianess: ENDIANNESS;
}

interface HeaderBlock {
    header: GmeshHeader;
    rest: string;
}

// tslint:disable:no-bitwise
export class GmeshLoader {

    private manager: THREE.LoadingManager;

    constructor(manager?: THREE.LoadingManager) {
        this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
    }

    public load(url: string, onLoad: (s: THREE.BufferGeometry) => void,
                onProgress?: (r: ProgressEvent) => void, onError?: (e: ErrorEvent) => void) {
        let self: GmeshLoader = this;
        let loader: THREE.FileLoader = new FileLoader(this.manager);

        loader.setResponseType('arraybuffer');
        loader.load(url, function (text) {

            onLoad(self.parse(text as any));

        }, onProgress, onError);

    }

    public parse(data: ArrayBuffer): BufferGeometry {
        let sData = this.ensureString(data);

        let headerBlock = this.getHeader(sData);

        if (headerBlock.header.ASCII) {
            let sections = this.splitSections(headerBlock.rest);
            let namedSections = this.processNames(sections);
            return this.parseASCII(namedSections);
        }

        return this.parseBinary(headerBlock.header, data);
    }

    private splitSections(blob: string): string[] {
        blob = blob.trim();

        let sections: string[] = [];
        while (blob !== '') {
            let sectionSeparator = /^\$([a-z-]+)\s*\n(.|\n)*\$End\1\s*$/mgi
            let results = sectionSeparator.exec(blob);
            if (results === null || results['index'] !== 0) {
                throw 'Found unknown text between sections: ' + blob.substring(0, results === null ? undefined : results['index']);
            }
            let output = results[0];
            sections.push(output);
            blob = blob.substring(output.length).trim();
        }

        return sections;
    }

    private processNames(sections: string[]): { [key: string]: string } {
        let block = {};
        sections.forEach((s: string) => {
            let idx = s.search(/\s+/g);
            if (idx < 0) {
                throw `Section doesn't have a name: ` + s
            }
            let name = s.substring(1, idx); // Skip the $ symbol
            let endIdx = s.indexOf('$End' + name);
            if (endIdx < 0) {
                throw `Section doesn't have an end: ` + endIdx;
            }
            block[name] = s.substring(idx + 1, endIdx).trim();
        });
        return block;
    }

    private getHeader(blob: string): HeaderBlock {
        blob = blob.trim();

        let headerSeparator = /^\$MeshFormat\s*\n(.|\n)*\$EndMeshFormat\s*$/mgi
        let results = headerSeparator.exec(blob);
        if (results === null || results['index'] !== 0) {
            throw 'Did not find header in msh file!';
        }
        let headerBlock = results[0];
        blob = blob.substring(headerBlock.length).trim();

        let headerData = headerBlock.replace(/\$(End)?MeshFormat\s*/g, '').trim().split(/\s+/mg)

        if (headerData.length !== 3 && headerData.length !== 4) {
            throw 'Header must contain exactly three or four elements, but is: ' + headerData;
        }
        if (headerData[0] !== GMESH_VERSION) {
            throw 'Only GMESH version ' + GMESH_VERSION + ' supported, but file is ' + headerData[0];
        }
        let ascii: number = parseInt(headerData[1], 10);
        if (ascii !== 1 && ascii !== 0 ) {
            throw 'File type must be either 0 or 1, but is ' + ascii;
        }
        let data_size = +(headerData[2]);
        if (data_size !== 8) {
            throw 'Data size must be 8 but is ' + data_size;
        }

        let endian = ENDIANNESS.NONE;
        if (ascii === 1) {
            if (headerData[3][0] === '\u0001') {
                endian = ENDIANNESS.LITTLE_ENDIAN;
            } else {
                endian = ENDIANNESS.BIG_ENDIAN;
            }
        }
        return {
            rest: blob,
            header: {
                version_number: headerData[0],
                ASCII: (ascii === 0),
                data_size: data_size,
                endianess: endian
            }
        };
    }

    private parseBinary(header: GmeshHeader, data: ArrayBuffer): BufferGeometry {

        let reader = new DataView(data);

        // First lets get the Nodes. So we can do something with them
        let nodesDataStartIdx = this.getEndIndexOfHeader(reader, '$Nodes');

        if (nodesDataStartIdx < 0 ) {
            throw 'Did not find nodes start in msh file!';
        }
        console.log('Nodes block starts at: ' + nodesDataStartIdx)

        // Second line is the count of nodes
        let numResult = this.readInteger(reader, nodesDataStartIdx);
        let nNodes = numResult.value;

        // Shift offset to after number
        nodesDataStartIdx = numResult.index;
        console.log('Preparing to read ' + nNodes + ' nodes from ' + nodesDataStartIdx);

        let vertices = [];
        let vertexMap = {};
        let sizeNodeBlock = 4 + 3 * header.data_size;
        for (let index = 0; index < nNodes; index++) {
            let nodeId = reader.getUint32(nodesDataStartIdx + sizeNodeBlock * index, header.endianess === ENDIANNESS.LITTLE_ENDIAN);

            vertexMap[nodeId] = index;

            for (let i = 0; i < 3 ; i++) {
                vertices.push(reader.getFloat64(nodesDataStartIdx + sizeNodeBlock * index + 4 + i * header.data_size,
                                                header.endianess === ENDIANNESS.LITTLE_ENDIAN));
            }
        }

        // First lets get the Elements. So we can do something with them
        let elementsStartDataIdx = this.getEndIndexOfHeader(reader, '$Elements', nodesDataStartIdx + nNodes * sizeNodeBlock);

        if (elementsStartDataIdx === null) {
            throw 'Did not find $Elements in msh file!';
        }

        numResult = this.readInteger(reader, elementsStartDataIdx);
        // First line is the elements header
        // Second line is the count of elements
        // Rest is binary content

        let nElements = numResult.value;

        console.log('Preparing to read ' + nElements + ' elements from: ' + numResult.index);

        let faces = []
        let readSoFar = numResult.index;
        for (let index = 0; index < nElements;) {
            let elementType = reader.getUint32(readSoFar, header.endianess === ENDIANNESS.LITTLE_ENDIAN);
            let followElements = reader.getUint32(readSoFar + 4, header.endianess === ENDIANNESS.LITTLE_ENDIAN);
            let numTags = reader.getUint32(readSoFar + 8, header.endianess === ENDIANNESS.LITTLE_ENDIAN);

            let elementSize = GMESH_NODES_TO_READ[elementType];
            readSoFar += 12;
            for (let i = 0; i < followElements ; i++) {
                let elementNumber  = reader.getUint32(readSoFar, header.endianess === ENDIANNESS.LITTLE_ENDIAN);
                readSoFar += 4;
                for (let t = 0; t < numTags; t++) {
                    // Read in and drop all the tags
                    reader.getUint32(readSoFar, header.endianess === ENDIANNESS.LITTLE_ENDIAN);
                    readSoFar += 4;
                }
                // Now read in the actual nodes
                for (let f = 0; f < elementSize; f++) {
                    let face = reader.getUint32(readSoFar, header.endianess === ENDIANNESS.LITTLE_ENDIAN);
                    readSoFar += 4;
                    if (elementType === 2) {
                        faces.push(vertexMap[face]);
                    }
                }
                // We read in a face, so count it
                index++;
            }
        }

        let geometry: THREE.BufferGeometry = new BufferGeometry();
        geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        geometry.setIndex(new BufferAttribute(new Uint32Array(faces), 1));
        geometry.computeVertexNormals();

        return geometry;

    }

    private parseASCII(data: { [key: string]: string }): THREE.BufferGeometry {

        let geometry: THREE.BufferGeometry = new BufferGeometry();

        let nodeData = data.Nodes.split(/\s+/mig);

        let vertices: number[] = [];
        let vertexMap = {}

        let numNodes = parseInt(nodeData.shift(), 10);

        let mappedId = 0;
        for (let num = 0; num < numNodes; num++) {
            let nodeNumber = parseInt(nodeData.shift(), 10);

            vertexMap[nodeNumber] = mappedId++;

            vertices.push(parseFloat(nodeData.shift()));
            vertices.push(parseFloat(nodeData.shift()));
            vertices.push(parseFloat(nodeData.shift()));
        }

        nodeData = undefined;
        let faceData = data.Elements.split(/\s+/mig);
        let faces: number[] = []

        let numElements = parseInt(faceData.shift(), 10);

        for (let num = 0; num < numElements; num++) {
            let elemNumber = parseInt(faceData.shift(), 10);
            let elemType = parseInt(faceData.shift(), 10);
            let numTags = parseInt(faceData.shift(), 10);

            // Skip over tags
            for (let i = 0; i < numTags; i++) { faceData.shift(); }

            let toSkip = GMESH_NODES_TO_READ[elemType];
            if (elemType === 2) {
                toSkip = 0;
                // This is a triangle, actually read it.
                for (let i = 0; i < 3; i++) {
                    faces.push(vertexMap[parseInt(faceData.shift(), 10)]);
                }

            } else if (toSkip === undefined) {
                throw 'Found a face of unknown type (aborting): ' + elemType;
            }

            // Skip not understood elements
            if ( toSkip !== 0 ) {
                console.log('Line not supported - skipped');
                for (let i = 0; i < toSkip; i++) {
                    faceData.shift();
                }
            }
        }

        geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        geometry.setIndex(new BufferAttribute(new Uint32Array(faces), 1));
        geometry.computeVertexNormals();

        return geometry;

    }

    private ensureString(buf: ArrayBuffer): string {
        if (typeof buf !== 'string') {
            let array_buffer = new Uint8Array(buf);
            if ((window as any).TextDecoder !== undefined) {
                return new (window as any).TextDecoder().decode(array_buffer);
            }

            let str = '';

            for (let i = 0, il = buf.byteLength; i < il; i++) {
                str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
            }

            return str;
        } else {
            return buf;
        }

    }

    private ensureBinary(buf) {

        if (typeof buf === 'string') {
            const buffer = new ArrayBuffer(buf.length * 2);
            let array_buffer = new Uint16Array(buffer);
            for (let i = 0; i < buf.length; i++) {
                array_buffer[i] = buf.charCodeAt(i); // implicitly assumes little-endian
            }
            return array_buffer.buffer || array_buffer;
        } else {
            return buf;
        }
    }

    private getEndIndexOfHeader(reader: DataView, expr: string, start = 0): number {
        let index = -1;

        outer: for (let readerIndex = start; readerIndex < reader.byteLength; readerIndex ++) {
            for (let exprIndex = 0; exprIndex < expr.length; exprIndex++) {
                const rValue = reader.getUint8(readerIndex + exprIndex);
                const eValue = expr.charCodeAt(exprIndex);
                if (rValue !== eValue) {
                    continue outer;
                }
            }
            index = readerIndex + expr.length;
            let char = reader.getUint8(index);
            // TODO: Fix this can read past the end of the line
            while (this.isWhiteSpace(char)) {
                index++;
                char = reader.getUint8(index);
            }
            return index;
        }

        return index;
    }

    private isWhiteSpace(char: number): boolean {
        switch (char) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 20:
                return true;
            default:
                return false;
        }
    }

    private isDigit(char: number): boolean {
        return char >= 48 && char <= 57;
    }

    private readInteger(reader: DataView, offset: number): { value: number, index: number} {
        let number: number[] = [];
        let idx = offset
        let char = reader.getUint8(idx);
        while (this.isWhiteSpace(char)) {
            idx++;
            char = reader.getUint8(idx);
        }
        while (this.isDigit(char)) {
            number.push(char);
            idx ++;
            char = reader.getUint8(idx);
        }
        // TODO: Fix this can read past the end of the line
        while (this.isWhiteSpace(char)) {
            idx++;
            char = reader.getUint8(idx);
        }
        return {
            value: parseInt(String.fromCharCode(...number), 10),
            index: idx
        };
    }
}
