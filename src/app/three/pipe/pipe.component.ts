import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, DoCheck } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color,
    MeshToonMaterial, BoxGeometry, PointLight, AmbientLight
} from 'three/src/Three';

import { TrackballControls } from '../TrackballControls';
import { PipeGeometry } from './pipeSource';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements ThreeComponent, OnInit, OnChanges, OnDestroy, DoCheck {

    @ViewChild('pipeDisplay') pipeDiv: ElementRef;
    @ViewChild('pipeCanvas') pipeCanvas: ElementRef;
    @Input() radius: number;
    @Input() length: number;
    @Input() shellWidth: number;
    @Input() resolution: number;

    private renderer: THREE.WebGLRenderer;
    private scene: any;
    private camera: any;
    private geometry: PipeGeometry;

    constructor() {
        this.radius = 5;
        this.length = 10;
        this.shellWidth = 1;
        this.resolution = 50;
    }

    public ngOnInit(): void {
        // Set up a render window
        this.renderer = new WebGLRenderer({alpha: true, canvas: this.pipeCanvas.nativeElement});
        this.pipeDiv.nativeElement.appendChild(this.renderer.domElement);

        this.scene = new Scene();
        this.scene.background = new Color(0xffffff);

        let screenRatio = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight;
        console.log('Setting screen ratio to ' + screenRatio + ' width: ' + this.renderer.domElement.offsetWidth);
        this.camera = new PerspectiveCamera(75, screenRatio, 0.1, 1000);

        this.geometry = new PipeGeometry(+this.radius, +this.shellWidth, +this.length, +this.resolution);
        let material = new MeshToonMaterial({ color: 0x222222 });
        let pipe = new Mesh(this.geometry.getGeometry(), material);

        let lights = [];
        lights[0] = new PointLight(0xffffff, 1, 0);
        lights[1] = new PointLight(0xffffff, 1, 0);
        lights[2] = new PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(- 100, - 200, - 100);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);

        let ambLight = new AmbientLight(0xffffff);
        this.scene.add(ambLight);

        this.scene.add(pipe);

        this.camera.position.z = this.length;

        this.render();

        let controls = new TrackballControls(this.camera, this.renderer.domElement, this);
    }

    public render(): void {
        if (this.renderer !== undefined) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    public ngOnChanges(): void {
        if (this.geometry !== undefined) {
            this.geometry.update(+this.radius, +this.shellWidth, +this.length, +this.resolution);
            this.render();
        }
    }

    public ngOnDestroy(): void {
        console.log('Boom! 💣')
    }

    public ngDoCheck(): void {
        if (this.camera === undefined) {
            return;
        }
        // var screenRatio = this.renderer.domElement.width / this.renderer.domElement.height;
        // this.camera.aspect = screenRatio;
        // console.log("Updating screen ratio to " + screenRatio);
        // console.log(this.renderer.domElement);
    }
}
