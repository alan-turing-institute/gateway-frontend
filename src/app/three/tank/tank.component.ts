import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, DoCheck } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color, DoubleSide,
    MeshPhongMaterial, BoxGeometry, PointLight, AmbientLight
} from 'three/src/Three';

import { TrackballControls } from '../TrackballControls';
import { STLLoader } from '../STLLoader';

@Component({
    selector: 'app-tank',
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.css']
})
export class TankComponent implements ThreeComponent, OnInit, OnChanges {

    @ViewChild('tankDisplay') tankDiv: ElementRef;
    @ViewChild('tankCanvas') tankCanvas: ElementRef;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private tank: THREE.Mesh;
    private stirrer: THREE.Mesh;
    private stirrers: { [type: string]: THREE.Mesh };
    private loader: STLLoader;

    @Input() blades: number;
    @Input() angle: number;

    constructor() {
        this.blades = 4;
        this.angle = 0;
        this.loader = new STLLoader();
        this.stirrers = {};
    }

    public ngOnInit(): void {
        // Set up a render window
        this.renderer = new WebGLRenderer({ alpha: true, canvas: this.tankCanvas.nativeElement });
        this.tankDiv.nativeElement.appendChild(this.renderer.domElement);

        this.scene = new Scene();
        this.scene.background = new Color(0xffffff);

        let screenRatio = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight;

        this.camera = new PerspectiveCamera(75, screenRatio, 0.1, 1000);

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

        let self: TankComponent = this;

        const tankUrl = require('./tank.stl');
        const stirrerUrl = require('./stirrer.stl');

        this.loader.load(tankUrl, function (geometry: THREE.Geometry) {
            let material = new MeshPhongMaterial({ color: 0x222222, transparent: true, opacity: 0.5, side: DoubleSide });
            geometry.computeBoundingBox();
            geometry.center();
            geometry.rotateX(-Math.PI / 4);
            self.tank = new Mesh(geometry, material);
            self.scene.add(self.tank);
            self.render();
        });

        this.loader.load(stirrerUrl, function (geometry: THREE.Geometry) {
            let material = new MeshPhongMaterial({ color: 0x333333, side: DoubleSide });
            geometry.computeBoundingBox();
            geometry.center();
            geometry.rotateX(-Math.PI / 4);
            self.stirrer = new Mesh(geometry, material);
            self.scene.add(self.stirrer);
            self.render();
        });

        this.camera.position.z = 0.25;

        this.render();

        let controls = new TrackballControls(this.camera, this.renderer.domElement, this);
    }

    public render(): void {
        if (this.renderer !== undefined) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    public ngOnChanges(): void {
        // Change the blades and angle of the stirrer displayed
        if (this.tank === undefined) {
            return;
        }
    }


}
