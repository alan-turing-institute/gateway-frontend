import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial, BoxGeometry } from 'three/src/Three';

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

    constructor() {
        this.radius = 5;
        this.length = 10;
        this.shellWidth = 1;
    }

    public ngOnInit(): void {
        // Set up a render window
        var scene = new Scene();
        var camera = new PerspectiveCamera(75, 1, 0.1, 1000);

        var renderer = new WebGLRenderer();
        renderer.setSize(100,100);
        this.pipeDiv.nativeElement.appendChild(renderer.domElement);

        var geometry = new BoxGeometry( 1, 1, 1 );
        var material = new MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new Mesh( geometry, material );
        scene.add( cube );
        
        camera.position.z = 5;

        renderer.render(scene, camera);
    }

    public ngOnChanges(): void {
        console.log("Changing radius to ...", this.radius);
    }
    public ngOnDestroy(): void {
        console.log("Boom! 💣")
    }
}
