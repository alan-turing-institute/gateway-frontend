import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, DoCheck } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color, DoubleSide,
    MeshToonMaterial, BoxGeometry, PointLight, AmbientLight, DirectionalLight,
    CylinderGeometry, CircleGeometry, Vector3,
    MeshPhongMaterial, FogExp2, AxisHelper
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
    private helper: THREE.AxisHelper;

    private axisRenderer: THREE.WebGLRenderer;
    private axisScene: THREE.Scene;
    private axisCamera: THREE.Camera;
    private axisHelper: THREE.AxisHelper;

    private objects: THREE.Mesh[];

    @Input() fileUrl: string ;

    constructor() {
        this.objects = [];

        this.fileUrl = "";
    }

    public ngOnInit(): void {

        // Set up a render window
        this.renderer = new WebGLRenderer({ alpha: true, canvas: this.interfaceCanvas.nativeElement });
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.interfaceDiv.nativeElement.appendChild(this.renderer.domElement);

        this.scene = new Scene();
        // this.scene.background = new Color(0xffffff);
        this.scene.background = new Color(0xcccccc);
        this.scene.fog = new FogExp2( 0xcccccc, 0.002 );

        this.helper = new AxisHelper( 5 );
        this.scene.add( this.helper );

        let screenRatio = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight;

        this.camera = new PerspectiveCamera(40, screenRatio, 0.1, 1000);
        this.camera.position.x = 4;
        this.camera.position.y = 0.4;
        this.camera.position.z = 3.15;

        let lights = [];

        lights[0] = new DirectionalLight( 0xffffff );
				lights[0].position.set( 1, 1, 1 );

        lights[1] = new DirectionalLight( 0x002288 );
        lights[1].position.set( -1, -1, -1 );

        lights[2] = new AmbientLight( 0x222222 );

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);

        let controls = new TrackballControls(this.camera, this.renderer.domElement, this);

        this.generateInterface();
        this.render();
        this.ngOnChanges();

    }

    public render(): void {
        if (this.renderer !== undefined) {
            this.renderer.render(this.scene, this.camera);
        }
        if (this.axisRenderer !== undefined) {
            this.axisRenderer.render(this.axisScene, this.axisCamera);
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

      let loader = new STLLoader();

      let interfaceMaterial = new MeshPhongMaterial( {
          color: 0xAAAAAA,
          specular: 0x111111,
          shininess: 200,
          transparent: true,
          opacity: 0.5
        } );

      let that = this
      // loader.load( 'src/assets/interface/stirred_tank_centred.stl', function (geometry) {
      loader.load( 'https://sgmiddleware.blob.core.windows.net/blue/stirred_tank_centred.stl', function (geometry) {
          let mesh = new Mesh( geometry, interfaceMaterial );

          //(red, green (up), blue)
          mesh.position.set( 0, 0, 0 );
          mesh.rotation.set( - Math.PI / 2, 0, 0 );
          mesh.scale.set( 15, 15, 15 );
          mesh.castShadow = false;
          mesh.receiveShadow = true;
          console.log(mesh.position.x, mesh.position.y, mesh.position.z)

          that.addToScene(mesh);
          that.render();
        });
    }

    private addToScene(mesh: THREE.Mesh): void {
        this.objects.push(mesh);
        this.scene.add(mesh);
    }

    private clearScene(): void {
        this.objects.map((obj: THREE.Mesh) => this.scene.remove(obj));
        this.objects = [];
    }

}
