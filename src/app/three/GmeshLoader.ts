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

enum FILE_TYPES {
    ASCII = 0,
    BINARY = 1
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

        loader.setResponseType('string');
        loader.load(url, function (text: string) {

            onLoad(self.parse(text));

        }, onProgress, onError);

    }

    public parse(data: string): BufferGeometry {

        let sData = this.ensureString(data);

        let sections = this.splitSections(sData);
        let namedSections = this.processNames(sections);
        let header = this.getHeader(namedSections);

        if (header.ASCII) {
            return this.parseASCII(namedSections);
        }

        throw 'Binary parsing not yet implemented';
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

    private getHeader(block: { [key: string]: string}): GmeshHeader {
        let headerData = block.MeshFormat.split(/\s+/mg)
        if (headerData.length !== 3) {
            throw 'Header must contain exactly three elements, but is: ' + headerData;
        }
        if (headerData[0] !== GMESH_VERSION) {
            throw 'Only GMESH version ' + GMESH_VERSION + ' supported, but file is ' + headerData[0];
        }
        let ascii: number = +(headerData[1]);
        if (ascii !== 1 && ascii !== 0 ) {
            throw 'File type must be either 0 or 1, but is ' + ascii;
        }
        let data_size = +(headerData[2]);
        if (data_size !== 8) {
            throw 'Data size must be 8 but is ' + data_size;
        }
        return {
            version_number: headerData[0],
            ASCII: (ascii === 0),
            data_size: data_size
            };
    }

    private parseBinary(data: ArrayBuffer): BufferGeometry {

        let reader = new DataView(data);
        let faces = reader.getUint32(80, true);

        let r, g, b, hasColors = false, colors;
        let defaultR, defaultG, defaultB, alpha;

        // process STL header
        // check for default color in header ("COLOR=rgba" sequence).

        for (let index = 0; index < 80 - 10; index++) {

            if ((reader.getUint32(index, false) === 0x434F4C4F /*COLO*/) &&
                (reader.getUint8(index + 4) === 0x52 /*'R'*/) &&
                (reader.getUint8(index + 5) === 0x3D /*'='*/)) {

                hasColors = true;
                colors = [];

                defaultR = reader.getUint8(index + 6) / 255;
                defaultG = reader.getUint8(index + 7) / 255;
                defaultB = reader.getUint8(index + 8) / 255;
                alpha = reader.getUint8(index + 9) / 255;

            }

        }

        let dataOffset = 84;
        let faceLength = 12 * 4 + 2;

        let geometry: THREE.BufferGeometry = new BufferGeometry();

        let vertices = [];
        let normals = [];

        for (let face = 0; face < faces; face++) {

            let start = dataOffset + face * faceLength;
            let normalX = reader.getFloat32(start, true);
            let normalY = reader.getFloat32(start + 4, true);
            let normalZ = reader.getFloat32(start + 8, true);

            if (hasColors) {

                let packedColor = reader.getUint16(start + 48, true);

                if ((packedColor & 0x8000) === 0) {

                    // facet has its own unique color

                    r = (packedColor & 0x1F) / 31;
                    g = ((packedColor >> 5) & 0x1F) / 31;
                    b = ((packedColor >> 10) & 0x1F) / 31;

                } else {

                    r = defaultR;
                    g = defaultG;
                    b = defaultB;

                }

            }

            for (let i = 1; i <= 3; i++) {

                let vertexstart = start + i * 12;

                vertices.push(reader.getFloat32(vertexstart, true));
                vertices.push(reader.getFloat32(vertexstart + 4, true));
                vertices.push(reader.getFloat32(vertexstart + 8, true));

                normals.push(normalX, normalY, normalZ);

                if (hasColors) {

                    colors.push(r, g, b);

                }

            }

        }

        geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        geometry.addAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));

        if (hasColors) {

            geometry.addAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
            (geometry as any).hasColors = true;
            (geometry as any).alpha = alpha;

        }

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

            let toSkip = 0;
            switch (elemType) {
                case 1:
                    toSkip = 2;
                    break;
                case 2:
                    // This is a triangle, actually read it.
                    faces.push(vertexMap[parseInt(faceData.shift(), 10)]);
                    faces.push(vertexMap[parseInt(faceData.shift(), 10)]);
                    faces.push(vertexMap[parseInt(faceData.shift(), 10)]);
                    break;
                case 3:
                case 4:
                    toSkip = 4;
                    break;
                case 5:
                    toSkip = 8;
                    break;
                case 6:
                    toSkip = 6;
                    break;
                default:
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

        console.log(faces)

        geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        geometry.setIndex(new BufferAttribute(new Uint32Array(faces), 1));
        geometry.computeVertexNormals();

        return geometry;

    }

    private ensureString(buf: string | ArrayBuffer): string {

        if (typeof buf !== 'string') {

            let array_buffer = new Uint8Array(buf);

            if ((window as any).TextDecoder !== undefined) {
                return new TextDecoder().decode(array_buffer);
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

            let array_buffer = new Uint8Array(buf.length);
            for (let i = 0; i < buf.length; i++) {

                array_buffer[i] = buf.charCodeAt(i) & 0xff; // implicitly assumes little-endian

            }
            return array_buffer.buffer || array_buffer;

        } else {

            return buf;

        }

    }

}
