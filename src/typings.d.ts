// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;


declare module '*.scss' {
    const content: any;
    export default content;
}

declare interface ThreeComponent {
    render(): void;
}