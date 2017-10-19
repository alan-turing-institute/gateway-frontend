import {
    Geometry, BufferGeometry, Float32BufferAttribute,
    Vector3, Vector2, Face3
} from 'three/src/Three';

declare interface PipeParameters {
    height: number;
    radius: number;
    resolution: number;
    shellWidth: number;
}

export class PipeGeometry {

    private parameters: PipeParameters;
    private geometry: THREE.Geometry;

    constructor(radius: number = 0.5, shellWidth: number = 0.1,
        height: number = 1, resolution: number = 6) {

        if (!Number.isFinite(radius) ||
            !Number.isFinite(height) ||
            !Number.isFinite(resolution) ||
            !Number.isFinite(shellWidth)) {
            throw("Invalid (non-numeric) argument provided to Pipe");
        }

        this.geometry = new Geometry();
        this.geometry.type = 'PipeGeometry';
        this.parameters = {
            radius: radius,
            height: height,
            resolution: resolution,
            shellWidth: shellWidth
        };

        this.generatePipe();

        this.geometry.elementsNeedUpdate = true;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.normalsNeedUpdate = true;

        this.geometry.computeBoundingSphere();
        this.geometry.computeFaceNormals();
    }

    public getGeometry(): THREE.Geometry {
        return this.geometry;
    }

    public update(radius: number, shellWidth: number,
        height: number, resolution: number) {

        if (!Number.isFinite(radius) ||
            !Number.isFinite(height) ||
            !Number.isFinite(resolution) ||
            !Number.isFinite(shellWidth)) {
            console.log("Invalid (non-numeric) argument provided to Pipe update");
        }

        this.parameters = {
            radius: radius,
            height: height,
            resolution: resolution,
            shellWidth: shellWidth
        };

        this.generatePipe();

        this.geometry.elementsNeedUpdate = true;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.normalsNeedUpdate = true;

        this.geometry.computeBoundingSphere();
        this.geometry.computeFaceNormals();
    }

    private generatePipe() {
        let bottomInsideVertices: THREE.Vector3[] = [];
        let bottomOutsideVertices: THREE.Vector3[] = [];
        let topInsideVertices: THREE.Vector3[] = [];
        let topOutsideVertices: THREE.Vector3[] = [];

        const angle = 2 * Math.PI / this.parameters.resolution;
        const xbot = -this.parameters.height / 2.0;
        const xtop = this.parameters.height / 2.0;
        const radius = this.parameters.radius;
        const shellWidth = this.parameters.shellWidth;
        const resolution = this.parameters.resolution;

        // generate vertices, normals and uvs
        for (let i = 0; i < resolution; i++) {

            // bottom inside
            let vertex = new Vector3();
            vertex.x = xbot;
            vertex.y = radius * Math.cos(i * angle);
            vertex.z = radius * Math.sin(i * angle);
            bottomInsideVertices.push(vertex);

            // top inside
            vertex = new Vector3();
            vertex.x = xtop;
            vertex.y = radius * Math.cos(i * angle);
            vertex.z = radius * Math.sin(i * angle);
            topInsideVertices.push(vertex);

            // bottom outside
            vertex = new Vector3();
            vertex.x = xbot;
            vertex.y = (radius + shellWidth) * Math.cos(i * angle);
            vertex.z = (radius + shellWidth) * Math.sin(i * angle);
            bottomOutsideVertices.push(vertex);

            // top outside
            vertex = new Vector3();
            vertex.x = xtop;
            vertex.y = (radius + shellWidth) * Math.cos(i * angle);
            vertex.z = (radius + shellWidth) * Math.sin(i * angle);
            topOutsideVertices.push(vertex);
        }
        this.geometry.vertices = [...bottomInsideVertices, ...topInsideVertices,
        ...bottomOutsideVertices, ...topOutsideVertices];

        // generate indices
        this.geometry.faces = [];
        for (let i = 0; i < resolution; i++) {
            let i_next = (i + 1) % resolution;

            // Inner face of the cylinder
            this.geometry.faces.push(new Face3(i, i + resolution, i_next));
            this.geometry.faces.push(new Face3(i_next, i + resolution, i_next + resolution));

            // Outer face of the cylinder
            this.geometry.faces.push(new Face3(i + 2 * resolution, i_next + 2 * resolution, i + 3 * resolution));
            this.geometry.faces.push(new Face3(i_next + 2 * resolution, i_next + 3 * resolution, i + 3 * resolution));

            // top face
            this.geometry.faces.push(new Face3(i, i_next, i + 2 * resolution));
            this.geometry.faces.push(new Face3(i_next, i_next + 2 * resolution, i + 2 * resolution));

            // bottom face
            this.geometry.faces.push(new Face3(i + 3 * resolution, i_next + 3 * resolution, i + resolution));
            this.geometry.faces.push(new Face3(i_next + 3 * resolution, i_next + resolution, i + resolution));
        }
    }
}
