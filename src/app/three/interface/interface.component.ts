import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, DoCheck } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color, DoubleSide,
    MeshToonMaterial, BoxGeometry, PointLight, AmbientLight,
    CylinderGeometry, CircleGeometry, Vector3
} from 'three/src/Three';

import { TrackballControls } from '../TrackballControls';
import { STLLoader } from '../STLLoader';

@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements ThreeComponent, OnInit, OnChanges {

    @ViewChild('interfaceDisplay') interfaceDiv: ElementRef;
    @ViewChild('interfaceCanvas') interfaceCanvas: ElementRef;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    private objects: THREE.Mesh[];

    @Input() fileUrl: string ;

    constructor() {
        this.objects = [];

        this.fileUrl = "";
    }

    public ngOnInit(): void {

        // Set up a render window
        this.renderer = new WebGLRenderer({ alpha: true, canvas: this.interfaceCanvas.nativeElement });
        this.interfaceDiv.nativeElement.appendChild(this.renderer.domElement);

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

        this.camera.position.z = 10 * 2;

        this.generateInterface();

        this.render();

        let controls = new TrackballControls(this.camera, this.renderer.domElement, this);
    }

    public render(): void {
        if (this.renderer !== undefined) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    public ngOnChanges(): void {
        // Ensure all variables are numbers

        if (this.scene === undefined) {
            return;
        }
        this.clearScene();
        this.generateInterface();
        this.render();
    }

    private generateInterface(): void {
        // let material = new MeshToonMaterial({ color: this.tank_colour, side: DoubleSide });
        //
        // let bodyGeom = new CylinderGeometry(this.tank_radius, this.tank_radius, this.tank_height,
        //                                 this.tank_resolution, 3, true);
        //
        // let baseGeom = new CircleGeometry(this.tank_radius, this.tank_resolution);
        // // Base is generated vertically so rotate it
        // baseGeom.rotateX(Math.PI / 2);
        // baseGeom.translate(0, -this.tank_height / 2, 0);
        //
        // let angleStep = 2 * Math.PI / this.num_baffles;
        // let sideBarDir: THREE.Vector3 = new Vector3(-this.tank_radius + this.baffle_width / 2, 0, 0);
        // for (let i = 0 ; i < this.num_baffles; i++) {
        //     let sideBarGeom = new BoxGeometry(this.baffle_width, this.tank_height, this.baffle_thickness);
        //
        //     sideBarGeom.translate(sideBarDir.x, sideBarDir.y, sideBarDir.z);
        //     sideBarGeom.rotateY(angleStep * i);
        //
        //     this.addToScene(sideBarGeom, material);
        // }
        //
        // this.addToScene(bodyGeom, material);
        // this.addToScene(baseGeom, material);
    }

    private addToScene(geom: THREE.Geometry, material: THREE.Material): void {
        let mesh = new Mesh(geom, material);

        this.objects.push(mesh);
        this.scene.add(mesh);
    }

    private clearScene(): void {
        this.objects.map((obj: THREE.Mesh) => this.scene.remove(obj));
        this.objects = [];
    }

}
