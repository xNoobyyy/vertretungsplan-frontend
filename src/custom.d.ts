// custom module so I can load svg-images
declare module "*.svg" {
    const content: any;
    export default content;
}