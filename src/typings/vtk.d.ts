declare module 'vtk.js/Sources/vtk' {
 export default function vtk(...args: any[]): any;
}

declare module 'vtk.js/Sources/Rendering/Core/Mapper' {
    function vtkMapper(publicAPI: any, model: any): any;
    function newInstance(): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/Filters/Sources/ConeSource' {
    function vtkConeSource(publicAPI: any, model: any): void;
    function newInstance(model: ConeModel): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export interface ConeModel {
        height?: number;
        radius?: number;
        resolution?: number;
        center?: number[];
        direction?: number[];
        capping?: boolean;
        pointType?: string; 
    }

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow' { 
    function newInstance(args?: any): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}
declare module 'vtk.js/Sources/Rendering/Core/Actor' { 
    function vtkActor(publicAPI: any, model: any): any;
    function newInstance(): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/Filters/General/Calculator' { 
    function vtkCalculator(publicAPI: any, model: any): any;
    function newInstance(): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/Common/DataModel/DataSetAttributes/Constants' {
    export var AttributeTypes: IAttributeTypes;
    
    export interface IAttributeTypes {
         SCALARS: number; 
         VECTORS: number; 
         NORMALS: number; 
         TCOORDS: number; 
         TENSORS: number;
         GLOBALIDS: number;
         PEDIGREEIDS: number; 
         EDGEFLAG:  number;
         NUM_ATTRIBUTES: number;
    }

    export default { AttributeTypes };
}

 declare module 'vtk.js/Sources/Common/DataModel/DataSet/Constants' {
     var FieldDataTypes: IFieldDataTypes;

     export interface IFieldDataTypes{
         UNIFORM: number;
         DATA_OBJECT_FIELD: number;
         COORDINATE: number;
         POINT_DATA: number;
         POINT: number;
         POINT_FIELD_DATA: number;
         CELL: number;
         CELL_FIELD_DATA: number;
         VERTEX: number;
         VERTEX_FIELD_DATA: number;
         EDGE: number;
         EDGE_FIELD_DATA: number;
         ROW: number;
         ROW_DATA: number;
     }
 }
