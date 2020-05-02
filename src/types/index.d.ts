// TODO: Must be generated!

declare module 'angus-chaincode' {

    import { Context, Contract } from 'fabric-contract-api';
    //@ts-ignore TS2300 
    export class AngusContext extends Context {
        constructor();
        getLogger(method: string): import("winston").Logger;
    }
    //@ts-ignore TS2300 
        export class AngusContract extends Contract {
        LOGLEVEL: string;
        beforeTransaction(ctx: AngusContext): Promise<void>;
        unknownTransaction(ctx: AngusContext): Promise<void>;
    }
    //@ts-ignore TS2300 
    export class AngusModel {
        class: string;
        key: string;
        currentState: string;
        constructor(stateClass: string, keyParts: string[]);
        getClass(): string;
        getKey(): string;
        getSplitKey(): string[];
        getCurrentState(): string;
        serialize(): Buffer;
        static serialize(object: Object): Buffer;
        static deserialize(data: any, supportedClasses: any): any;
        static deserializeClass(data: any, objClass: any): any;
        static makeKey(keyParts: string[]): string;
        static splitKey(key: any): string[];
    }    
    //@ts-ignore TS2300 
    export class AngusController {
        ctx: AngusContext;
        name: string;
        supportedClasses: any;
        constructor(ctx: AngusContext, listName: string);
        createCompositeKey(name: string, keys: string[]): string;
        addModel(model: AngusModel): Promise<void>;
        getModel(key: string): Promise<any>;
        updateModel(model: AngusModel): Promise<void>;
        deleteModel(model: AngusModel): Promise<void>;
        getModelList(query: object): Promise<any[]>;
        use(modelClass: any): void;
    }    
}

