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

    private objects: THREE.Mesh[];

    @Input() data: any [];
    private nameToIndex: any;
    private indexToName: any;

    // Stirrer properties
    @Input() axle_radius: number;
    @Input() axle_height: number;
    @Input() axle_resolution: number;
    @Input() axle_clearance: number;

    @Input() hub_thickness: number;
    @Input() hub_radius: number;
    @Input() hub_resolution: number;

    @Input() num_blades: number;
    @Input() blade_angle: number;
    @Input() blade_width: number;
    @Input() blade_height: number;
    @Input() blade_depth: number;

    @Input() stirrer_colour: number;

    // Tank properties
    @Input() tank_radius: number;
    @Input() tank_height: number;
    @Input() tank_resolution: number;
    @Input() num_baffles: number;
    @Input() baffle_width: number;
    @Input() baffle_thickness: number;
    @Input() tank_colour: number;

    constructor() {
        this.objects = [];

        this.data = [];
        this.nameToIndex = {};
        this.indexToName = {};

        // Set default values
        this.axle_radius = 0.0025;
        this.axle_height = 0.01;
        this.axle_resolution = 50;
        this.axle_clearance = 0.035;

        this.hub_thickness = 0.009;
        this.hub_radius = 0.005;
        this.hub_resolution = 50;

        this.num_blades = 4;
        this.blade_angle = 45 * Math.PI / 180;
        this.blade_width = 0.02; // protrusion out
        this.blade_height = 0.002;
        this.blade_depth = 0.002;

        this.stirrer_colour = 0x444444;

        this.tank_radius = 0.0425;
        this.tank_height = 0.065;
        this.tank_resolution = 50;
        this.num_baffles = 4;
        this.baffle_width = 0.01;
        this.baffle_thickness = 0.001;
        this.tank_colour = 0x222222;
    }

    public ngOnInit(): void {

        // build lookup objects
        // (not yet used, but may prove useful for accessing parameter values)
        for (let p in this.data) {
          this.indexToName[p] = this.data[p].name
          this.nameToIndex[this.data[p].name] = p
        }

        // Set up a render window
        this.renderer = new WebGLRenderer({ alpha: true, canvas: this.tankCanvas.nativeElement });
        this.tankDiv.nativeElement.appendChild(this.renderer.domElement);

        this.scene = new Scene();
        this.scene.background = new Color(0xffffff);

        let screenRatio = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight;

        this.camera = new PerspectiveCamera(75, screenRatio, 0.001, 1000);

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
        this.generateStirrer();

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

        console.log('ngOnChanges() this.data', this.data)
        for (let p in this.data) {
          if (this.data[p].name == "tank_height") {
            // this.tank_height = this.data[p].value
            console.log(this.data[p].name)
            console.log(this.data[p].value)
          }
        }

        // unpack data structure
        for (let p in this.data) {
          if (this.data[p].name == "tank_axle_radius") {
            this.axle_radius = this.data[p].value
          } else if (this.data[p].name == "tank_axle_height") {
            this.axle_height = this.data[p].value
          } else if (this.data[p].name == "tank_axle_clearance") {
            this.axle_clearance = this.data[p].value
          } else if (this.data[p].name == "tank_hub_thickness") {
            this.hub_thickness = this.data[p].value
          } else if (this.data[p].name == "tank_hub_radius") {
            this.hub_radius = this.data[p].value
          } else if (this.data[p].name == "tank_num_blades") {
            this.num_blades = this.data[p].value
          } else if (this.data[p].name == "tank_blade_angle") {
            this.blade_angle = this.data[p].value
          } else if (this.data[p].name == "tank_blade_width") {
            this.blade_width = this.data[p].value
          } else if (this.data[p].name == "tank_blade_height") {
            this.blade_height = this.data[p].value
          } else if (this.data[p].name == "tank_blade_depth") {
            this.blade_depth = this.data[p].value
          } else if (this.data[p].name == "tank_radius") {
            this.tank_radius = this.data[p].value
          } else if (this.data[p].name == "tank_height") {
            this.tank_height = this.data[p].value
          } else if (this.data[p].num_baffles == "tank_num_baffles") {
            this.num_baffles = this.data[p].value
          } else if (this.data[p].name == "tank_baffle_width") {
            this.baffle_width = this.data[p].value
          } else if (this.data[p].name == "tank_baffle_thickness") {
            this.baffle_thickness = this.data[p].value
          }
        }

        if (this.scene === undefined) {
            return;
        }
        this.clearScene();
        this.generateTank();
        this.generateStirrer();
        this.render();
    }

    private generateTank(): void {
        let material = new MeshToonMaterial({
          color: this.tank_colour,
          side: DoubleSide,
          transparent: true,
          opacity: 0.5});

        let bodyGeom = new CylinderGeometry(this.tank_radius, this.tank_radius, this.tank_height,
                                        this.tank_resolution, 3, true);

        let baseGeom = new CircleGeometry(this.tank_radius, this.tank_resolution);
        // Base is generated vertically so rotate it
        baseGeom.rotateX(Math.PI / 2);
        baseGeom.translate(0, -this.tank_height / 2, 0);

        let angleStep = 2 * Math.PI / this.num_baffles;
        let sideBarDir: THREE.Vector3 = new Vector3(-this.tank_radius + this.baffle_width / 2, 0, 0);
        for (let i = 0 ; i < this.num_baffles; i++) {
            let sideBarGeom = new BoxGeometry(this.baffle_width, this.tank_height, this.baffle_thickness);

            sideBarGeom.translate(sideBarDir.x, sideBarDir.y, sideBarDir.z);
            sideBarGeom.rotateY(angleStep * i);

            this.addToScene(sideBarGeom, material);
        }

        this.addToScene(bodyGeom, material);
        this.addToScene(baseGeom, material);
    }

    private generateStirrer(): void {
        let material = new MeshToonMaterial({ color: this.stirrer_colour, side: DoubleSide });

        // Make the axle
        let axleGeom = new CylinderGeometry(this.axle_radius, this.axle_radius, this.axle_height,
                                            this.axle_resolution, 3, false);

        let currentClearance =  this.tank_height / 2 - this.axle_height / 2;
        let clearanceShift = this.axle_clearance - currentClearance;
        axleGeom.translate(0, clearanceShift, 0);

        this.addToScene(axleGeom, material);

        // Make the hub
        let hubGeom = new CylinderGeometry(this.hub_radius, this.hub_radius, this.hub_thickness,
                                           this.hub_resolution, 3, false);
        let hubClearance =  this.tank_height / 2 - this.hub_thickness / 2;
        let hubShift = this.axle_clearance - hubClearance;
        hubGeom.translate( 0, hubShift, 0);

        this.addToScene(hubGeom, material);

        // Make the blades
        let bladeRotation = 2 * Math.PI / this.num_blades;
        for (let i = 0; i < this.num_blades; i++) {
            let bladeGeom = new BoxGeometry(this.blade_width, this.blade_height, this.blade_depth,
                                            3, 3, 3);
            bladeGeom.rotateX(this.blade_angle);
            // blades are aliged to the middle of the hub edge

            bladeGeom.translate(this.hub_radius, hubShift, 0);
            bladeGeom.rotateY(i * bladeRotation);

            this.addToScene(bladeGeom, material);
        }

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
