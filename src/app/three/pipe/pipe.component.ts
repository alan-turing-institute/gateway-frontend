import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';

import vtkRenderWindow            from 'vtk.js/Sources/Rendering/Core/RenderWindow';


import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkCalculator from 'vtk.js/Sources/Filters/General/Calculator';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkCylinderSource from './pipeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkHttpDataSetReader       from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import { AttributeTypes } from 'vtk.js/Sources/Common/DataModel/DataSetAttributes/Constants';
import { FieldDataTypes } from 'vtk.js/Sources/Common/DataModel/DataSet/Constants';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class VtkComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild('pipeDisplay') vtkRoot: ElementRef;
    @Input() radius: number;
    @Input() length: number;
    @Input() shellWidth: number;

    private cylinderSource: any;
    private renderWindow: any;

    constructor() {
        this.radius = 5;
    }

    public ngOnInit(): void {
        console.log(" Init radius= ", this.radius)
        // Set up VTK
        const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
            rootContainer: this.vtkRoot.nativeElement,
            containerStyle: { }
        });
        fullScreenRenderer.getRenderWindow().getViews()[0].setSize([500,500]);
        const renderer = fullScreenRenderer.getRenderer();
        this.renderWindow = fullScreenRenderer.getRenderWindow();
        const actor = vtkActor.newInstance();
        const mapper = vtkMapper.newInstance();

        this.cylinderSource = vtkCylinderSource.newInstance({ height: 10.0, resolution: 50, radius: +this.radius });

        actor.setMapper(mapper);
        mapper.setInputConnection(this.cylinderSource.getOutputPort());
        renderer.addActor(actor);
        renderer.resetCamera();
        this.renderWindow.render();

    }

    public ngOnChanges(): void {
        console.log("Changing radius to ...", this.radius);
        if(this.cylinderSource !== undefined){
            this.cylinderSource.setRadius(this.radius)
            this.renderWindow.render();
         }
    }
    public ngOnDestroy(): void {
        console.log("Boom! 💣")
    }
}
