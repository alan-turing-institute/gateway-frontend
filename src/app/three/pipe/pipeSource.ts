import { Geometry, BufferGeometry, Float32BufferAttribute, 
         Vector3, Vector2 } from 'three/src/Three';

declare interface PipeParameters {
    height: number;
    radius: number;
    resolution: number;
    shellWidth: number;
}

export class PipeGeometry extends Geometry {

    constructor (radius: number = 0.5, shellWidth: number = 0.1, 
        height:number =1 , resolution: number = 6 ) {

        super();
        super.type = 'PipeGeometry';
        super.parameters = {   
            radius: radius,
            height: height,
            resolution: resolution,
            shellWidth: shellWidth
        };

        super.fromBufferGeometry( new PipeBufferGeometry(radius, shellWidth, height, resolution) );
        super.computeVertexNormals();
        super.mergeVertices();
    }
}

export class PipeBufferGeometry extends BufferGeometry {

    private indices;
    private vertices;
    private normals_temp;
    private uvs;

    constructor(radius: number, shellWidth: number, height: number, resolution: number) {
        super();

        super.type = 'PipeBufferGeometry';
        super.parameters = {   
            radius: radius,
            height: height,
            resolution: resolution,
            shellWidth: shellWidth
        };

        var scope = this;

        if(!Number.isFinite(radius) &&
        !Number.isFinite(height) &&
        !Number.isFinite(resolution) &&
        !Number.isFinite(shellWidth)) {
            console.log("Invalid (non-numeric) argument provided to Pipe");
        }

        // buffers

        this.indices = [];
        this.vertices = [];
        this.normals_temp = [];
        this.uvs = [];

        // generate geometry

        this.generatePipe();


        // build geometry

        console.log(new Float32Array(this.vertices))
        super.setIndex( this.indices );
        super.addAttribute( 'position', new Float32BufferAttribute( this.vertices, 3 ) );
        //super.removeAttribute( 'normal');
        // super.addAttribute( 'normal', new Float32BufferAttribute( this.normals_temp, 3 ) );
        //super.addAttribute( 'uv', new Float32BufferAttribute( this.uvs, 2 ) );

        //super.computeFaceNormals();
        //super.computeVertexNormals();
        console.log(this);
    }
    
    private generatePipe() {
        var normal = new Vector3();
        var vertex = new Vector3();
    
        var groupCount = 0;
    
        let bottomInsideVertices = [];
        let bottomOutsideVertices = [];
        let topInsideVertices = [];
        let topOutsideVertices = [];

        const angle = 2 * Math.PI / super.parameters.resolution;
        const xbot = -super.parameters.height / 2.0;
        const xtop = super.parameters.height / 2.0;
        const radius = super.parameters.radius;
        const shellWidth = super.parameters.shellWidth;
        const resolution = super.parameters.resolution;

            // generate vertices, normals and uvs
            for (let i = 0; i < resolution; i++) {

                        // bottom inside
                        vertex.x = xbot;
                        vertex.y = radius * Math.cos(i * angle);
                        vertex.z = radius * Math.sin(i * angle);
                        bottomInsideVertices.push(vertex.x, vertex.y, vertex.z);

                        normal.x = Math.random();
                        normal.y = Math.random();
                        normal.z = Math.random();
                        this.normals_temp.push(normal.x, normal.y, normal.z);
                        
                
                        // top inside
                        vertex.x = xtop;
                        vertex.y = radius * Math.cos(i * angle);
                        vertex.z = radius * Math.sin(i * angle);
                        topInsideVertices.push(vertex.x, vertex.y, vertex.z);

                        normal.x = Math.random();
                        normal.y = Math.random();
                        normal.z = Math.random();
                        this.normals_temp.push(normal.x, normal.y, normal.z);

                        // bottom outside
                        vertex.x = xbot;
                        vertex.y = (radius + shellWidth) * Math.cos(i * angle);
                        vertex.z = (radius + shellWidth) * Math.sin(i * angle);
                        bottomOutsideVertices.push(vertex.x, vertex.y, vertex.z);

                        normal.x = Math.random();
                        normal.y = Math.random();
                        normal.z = Math.random();
                        this.normals_temp.push(normal.x, normal.y, normal.z);
                
                        // top outside
                        vertex.x = xtop;
                        vertex.y = (radius + shellWidth) * Math.cos(i * angle);
                        vertex.z = (radius + shellWidth) * Math.sin(i * angle);
                        topOutsideVertices.push(vertex.x, vertex.y, vertex.z);

                        normal.x = Math.random();
                        normal.y = Math.random();
                        normal.z = Math.random();
                        this.normals_temp.push(normal.x, normal.y, normal.z);
                
                    }
                    this.vertices = [...bottomInsideVertices, ...topInsideVertices,
                                     ...bottomOutsideVertices, ...topOutsideVertices];
    
            // generate indices
            for (let i = 0; i < resolution; i++) {
                let  i_next = (i + 1) % resolution;
      
                // Inner face of the cylinder
                this.indices.push(i, i_next, i + resolution);
                this.indices.push(i_next, i_next + resolution, i + resolution);
      
                // Outer face of the cylinder
                this.indices.push(i + 2* resolution, i_next + 2 * resolution, i + 3*resolution);
                this.indices.push(i_next + 2 * resolution, i_next + 3 * resolution, i + 3 * resolution);
      
                // top face
                this.indices.push(i, i_next, i + 2 * resolution);
                this.indices.push(i_next, i_next + 2 * resolution, i + 2 * resolution);
      
                // bottom face
                this.indices.push(i + 3 * resolution, i_next + 3 * resolution, i + resolution);
                this.indices.push(i_next + 3 * resolution, i_next + resolution, i + resolution);
      }
    
            // add a group to the geometry. this will ensure multi material support
                // TODO Actually do this.
            // scope.addGroup( groupStart, groupCount, 0 );
    
            // calculate new start value for groups
    
            //groupStart += groupCount;
    
        }
}
