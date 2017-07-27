import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkCalculator from 'vtk.js/Sources/Filters/General/Calculator';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkHttpDataSetReader       from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import { AttributeTypes } from 'vtk.js/Sources/Common/DataModel/DataSetAttributes/Constants';
import { FieldDataTypes } from 'vtk.js/Sources/Common/DataModel/DataSet/Constants';


import '../assets/css/styles.css';

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
      containerStyle: {}
    });
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    // const coneSource = vtkConeSource.newInstance({ height: 1.0 });
    // const filter = vtkCalculator.newInstance();
    // filter.setInputConnection(coneSource.getOutputPort());
    // filter.setFormula({
    //   getArrays: (inputDataSets: any) => ({
    //     input: [] as number[],
    //     output: [
    //       { location: FieldDataTypes.CELL, name: 'Random', dataType: 'Float32Array', attribute: AttributeTypes.SCALARS },
    //     ],
    //   }),
    //   evaluate: (arraysIn: any, arraysOut: any) => {
    //     const [scalars] = arraysOut.map((d: any) => d.getData());
    //     for (let i = 0; i < scalars.length; i++) {
    //       scalars[i] = Math.random();
    //     }
    //   },
    // });

    const mapper = vtkMapper.newInstance();
    // mapper.setInputConnection(filter.getOutputPort());
        const reader = vtkHttpDataSetReader.newInstance();
        const actor = vtkActor.newInstance();
        mapper.setInputConnection(reader.getOutputPort());
        actor.setMapper(mapper);
        reader.setUrl(require('../assets/cube.vtp'), { fullpath: true}).
            then(() => { // '/assets/cube.vtp');
                    reader.loadData().then(() => {
                        renderer.resetCamera();
                        renderWindow.render();
                        renderer.addActor(actor);
                    });
            });
    // -----------------------------------------------------------
    // UI control handling
    // -----------------------------------------------------------
    // fullScreenRenderer.addController(controlPanel);
    // const representationSelector = document.querySelector('.representations');
    // const resolutionChange = document.querySelector('.resolution');
    // representationSelector.addEventListener('change', (e) => {
    //   const newRepValue = Number(e.target.value);
    //   actor.getProperty().setRepresentation(newRepValue);
    //   renderWindow.render();
    // });
    // resolutionChange.addEventListener('input', (e) => {
    //   const resolution = Number(e.target.value);
    //   coneSource.setResolution(resolution);
    //   renderWindow.render();
    // });
    }
}
