import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, DoCheck } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color, DoubleSide,
    MeshToonMaterial, BoxGeometry, PointLight, AmbientLight,
    CylinderGeometry, CircleGeometry, Vector3
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

    @Input() num_blades: number;
    @Input() blade_angle: number;

    @Input() tank_radius: number;
    @Input() tank_height: number;
    @Input() tank_resolution: number;
    @Input() num_tank_side_bar: number;
    @Input() tank_side_bar_ratio: number;

    constructor() {
        this.num_blades = 4;
        this.blade_angle = 0;
        this.tank_radius = 10;
        this.tank_height = 10;
        this.tank_resolution = 50;
        this.num_tank_side_bar = 4;
        this.tank_side_bar_ratio = 15;
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

        this.camera.position.z = this.tank_radius * 2;

        this.generateTank();

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
    }

    private generateTank(): Mesh {
        let material = new MeshToonMaterial({ color: 0x222222, side: DoubleSide });

        let bodyGeom = new CylinderGeometry(this.tank_radius, this.tank_radius, this.tank_height,
                                        this.tank_resolution, 3, true);

        let baseGeom = new CircleGeometry(this.tank_radius, this.tank_resolution);
        // Base is generated vertically so rotate it
        baseGeom.rotateX(Math.PI / 2);
        baseGeom.translate(0, -this.tank_radius / 2, 0);

        let sideBarWidth = this.tank_radius / this.tank_side_bar_ratio;

        let angleStep = 2 * Math.PI / this.num_tank_side_bar;
        let sideBarDir: THREE.Vector3 = new Vector3(-this.tank_radius + sideBarWidth / 2, 0, 0);
        for (let i = 0 ; i < this.num_tank_side_bar; i++) {
            let sideBarGeom = new BoxGeometry(sideBarWidth, this.tank_height, 0);

            sideBarGeom.translate(sideBarDir.x, sideBarDir.y, sideBarDir.z);
            sideBarGeom.rotateY(angleStep * i);
            let sideBar = new Mesh( sideBarGeom, material);
            this.scene.add(sideBar);
        }

        let body = new Mesh( bodyGeom, material);
        let base = new Mesh( baseGeom, material);

        this.scene.add(body);
        this.scene.add(base);
    }

}
