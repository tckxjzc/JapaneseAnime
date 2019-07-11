declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}

declare module '*.frag' {
    const content:string;
    export = content;
}
declare module '*.vert' {
    const content:string;
    export = content;
}
declare module '*.txt' {
    const content:string;
    export = content;
}

declare var wbp:{
    dev:boolean
};

type RootState={
    loading:{
        prev:number,
        shade:number,
        effect:number
    }
};