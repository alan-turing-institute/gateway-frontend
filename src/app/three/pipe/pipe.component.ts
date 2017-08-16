import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, 
         MeshToonMaterial, BoxGeometry, PointLight } from 'three/src/Three';
 
import { TrackballControls } from './TrackballControls';
import { PipeGeometry } from './PipeSource';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild('pipeDisplay') pipeDiv: ElementRef;
    @Input() radius: number;
    @Input() length: number;
    @Input() shellWidth: number;

    private cylinderSource: any;
    private renderWindow: any;
    private renderer: any;
    private scene: any;
    private camera: any;

    constructor() {
        this.radius = 5;
        this.length = 10;
        this.shellWidth = 1;
    }

    public ngOnInit(): void {
        // Set up a render window
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, 1, 0.1, 1000);

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(100,100);
        this.pipeDiv.nativeElement.appendChild(this.renderer.domElement);

        var geometry = new PipeGeometry( 1, 0.5, 10, 15 );
        var material = new MeshToonMaterial( { color: 0x888888 } );
        var cube = new Mesh( geometry, material );

       var lights = [];
       lights[ 0 ] = new PointLight( 0xff0000, 1, 0 );
       lights[ 1 ] = new PointLight( 0x0000ff, 1, 0 );
       lights[ 2 ] = new PointLight( 0x00ff00, 1, 0 );

       lights[ 0 ].position.set( 0, 200, 0 );
       lights[ 1 ].position.set( 100, 200, 100 );
       lights[ 2 ].position.set( - 100, - 200, - 100 );

       this.scene.add( lights[ 0 ] );
       this.scene.add( lights[ 1 ] );
       this.scene.add( lights[ 2 ] );

        this.scene.add( cube );
        
        this.camera.position.z = 5;

        this.render();

        var controls = new TrackballControls(this.camera, this.renderer.domElement, this);
    }

    public render(): void {
        if(this.renderer !== undefined){
            this.renderer.render(this.scene, this.camera);
        }
    }

    public ngOnChanges(): void {
        console.log("Changing radius to ...", this.radius);
    }

    public ngOnDestroy(): void {
        console.log("Boom! 💣")
    }
}
