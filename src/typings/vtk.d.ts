declare interface VtkModel {
    deleted?: boolean;
    classHierarchy?: any;
}

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
    function vtkConeSource(publicAPI: any, model: ConeModel): void;
    function newInstance(model: ConeModel): any;
    function extend(publicAPI: any, model: ConeModel, initialValues: ConeModel): any;

    export interface ConeModel extends VtkModel{
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
    function newInstance(args?: FullScreenRenderWindowValues): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    interface FullScreenRenderWindowValues {
        rootContainer?: HTMLElement;
        container?: HTMLElement;
        containerStyle?: any;
    }

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/Rendering/Core/RenderWindow' {
    function newInstance(args?: RenderWindowModel): any;
     function extend(publicAPI: any, model: any, initialValues: any): any;

    interface RenderWindowModel {
        shaderCache: any;
        initialized: boolean;
        context: any;
        canvas: HTMLElement;
        size: number[];
        cursorVisibility: boolean;
        cursor: string;
        textureUnitManager: any;
        textureResourceIds: any;
        renderPasses: any[];
        notifyImageReady: boolean;
        webgl2: boolean;
        defaultToWebgl2: boolean; // turned off by default
    }

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

declare module 'vtk.js/Sources/IO/Misc/OBJReader' {
    function vtkOBJReader(publicAPI: any, model: any): any;
    function newInstance(): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/IO/Core/HttpDataSetReader' {
    function vtkHttpDataSetReader(publicAPI: any, model: any): any;
    function newInstance(): any;
    function extend(publicAPI: any, model: any, initialValues: any): any;

    export default { newInstance, extend };
}

declare module 'vtk.js/Sources/macro' {
    export function obj(publicAPI: any, model: any): any;
    export function setGet(publicAPI: any, model: any, fieldNames: string []): void;
    export function setGetArray(publicAPI: any, model: any, fieldNames: string [], size: number): void;
    export function algo(publicAPI: any, model: any, numberOfInputs: number, numberOfOutputs: number): any;
    export function newInstance(extend: (publicAPI: any, model: any, initialValues: any) => any, className: string): any;
    export default { obj, setGet, setGetArray, algo, newInstance };
}

declare module 'vtk.js/Sources/Common/DataModel/PolyData' {
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
