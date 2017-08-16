declare interface CylinderModel {
        height?: number;
        radius?: number;
        resolution?: number;
        center?: number [];
        direction?: number [];
        shellWidth?: number;
        pointType?: string;
}

// ----------------------------------------------------------------------------
// PipeSource methods
// ----------------------------------------------------------------------------

function PipeSource(publicAPI: any, model: CylinderModel): void {


    function requestData(inData: any, outData: any []) {
    
    let dataset = outData[0];

    const angle = 2 * Math.PI / model.resolution;
    const xbot = -model.height / 2.0;
    const xtop = model.height / 2.0;
    const numberOfPoints = 4 * model.resolution;
    const cellArraySize = (5 * 4 * model.resolution); // (size + 4 points) * 4 faces

    // Points
    const points = new window[model.pointType](numberOfPoints * 3); // for the 3Dimensions

    // Cells
    let cellLocation = 0;
    const polys = new Uint32Array(cellArraySize);


    // Add all points
    for (let i = 0; i < model.resolution; i++) {

        // bottom inside
        points[(i * 3) + 0] = xbot;
        points[(i * 3) + 1] = model.radius * Math.cos(i * angle);
        points[(i * 3) + 2] = model.radius * Math.sin(i * angle);

        // top inside
        points[(model.resolution * 3 * 1) + (i * 3) + 0] = xtop;
        points[(model.resolution * 3 * 1) + (i * 3) + 1] = model.radius * Math.cos(i * angle);
        points[(model.resolution * 3 * 1) + (i * 3) + 2] = model.radius * Math.sin(i * angle);

        // bottom outside
        points[(model.resolution * 3 * 2) + (i * 3) + 0] = xbot;
        points[(model.resolution * 3 * 2) + (i * 3) + 1] = (model.radius + model.shellWidth) * Math.cos(i * angle);
        points[(model.resolution * 3 * 2) + (i * 3) + 2] = (model.radius + model.shellWidth) * Math.sin(i * angle);

        // top outside
        points[(model.resolution * 3 * 3) + (i * 3) + 0] = xtop;
        points[(model.resolution * 3 * 3) + (i * 3) + 1] = (model.radius + model.shellWidth) * Math.cos(i * angle);
        points[(model.resolution * 3 * 3) + (i * 3) + 2] = (model.radius + model.shellWidth) * Math.sin(i * angle);

    }

    // Add all triangle cells
      for (let i = 0; i < model.resolution; i++) {
          let  i_next = (i + 1) % model.resolution;

          // Inner face of the cylinder
          polys[cellLocation++] = 4; // size of polygon
          polys[cellLocation++] = i;
          polys[cellLocation++] = i_next;
          polys[cellLocation++] = i_next + model.resolution;
          polys[cellLocation++] = i + model.resolution;

          // Outer face of the cylinder
          polys[cellLocation++] = 4; // size of polygon
          polys[cellLocation++] = i + 2 * model.resolution;
          polys[cellLocation++] = i_next + 2 * model.resolution;
          polys[cellLocation++] = i_next + model.resolution + 2 * model.resolution;
          polys[cellLocation++] = i + model.resolution + 2 * model.resolution;

          // top face
          polys[cellLocation++] = 4; // size of polygon
          polys[cellLocation++] = i;
          polys[cellLocation++] = i_next;
          polys[cellLocation++] = i_next + 2 * model.resolution;
          polys[cellLocation++] = i + 2 * model.resolution;

          // bottom face
          polys[cellLocation++] = 4; // size of polygon
          polys[cellLocation++] = i + 3 * model.resolution;
          polys[cellLocation++] = i_next + 3 * model.resolution ;
          polys[cellLocation++] = i_next + model.resolution;
          polys[cellLocation++] = i + model.resolution;
}

    // FIXME apply tranform
    dataset = {};
    dataset.getPoints().setData(points, 3);
    dataset.getPolys().setData(polys, 1);

    // Update output
    outData[0] = dataset;
  }

  // Expose methods
  publicAPI.requestData = requestData;
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
    height: 1.0,
    radius: 0.5,
    resolution: 6,
    center: [0, 0, 0],
    direction: [1.0, 0.0, 0.0],
    shellWidth: 0.1,
    pointType: 'Float32Array',
};

// ----------------------------------------------------------------------------

export default { PipeSource };
