import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';

import vtkRenderWindow            from 'vtk.js/Sources/Rendering/Core/RenderWindow';


import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkCalculator from 'vtk.js/Sources/Filters/General/Calculator';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkCylinderSource from './vtkCylinderSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkHttpDataSetReader       from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import { AttributeTypes } from 'vtk.js/Sources/Common/DataModel/DataSetAttributes/Constants';
import { FieldDataTypes } from 'vtk.js/Sources/Common/DataModel/DataSet/Constants';


@Component({
  selector: 'app-vtk',
  templateUrl: './vtk.component.html',
  styleUrls: ['./vtk.component.css']
})
export class VtkComponent implements OnInit {

    @ViewChild('vtk') vtkRoot: ElementRef;

    constructor() {}

    public ngOnInit(): void {

        // Set up VTK
        const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
            rootContainer: this.vtkRoot.nativeElement,
            containerStyle: { }
        });
        fullScreenRenderer.getRenderWindow().getViews()[0].setSize([500,500]);
                
        const renderer = fullScreenRenderer.getRenderer();
        const renderWindow = fullScreenRenderer.getRenderWindow();
        const actor = vtkActor.newInstance();
        const mapper = vtkMapper.newInstance();

        const cylinderSource = vtkCylinderSource.newInstance({ height: 10.0, resolution: 50 });

        actor.setMapper(mapper);
        mapper.setInputConnection(cylinderSource.getOutputPort());
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();

    }
}
