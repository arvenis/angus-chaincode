import { Context } from 'fabric-contract-api';
import { Logger } from './logger';

export class AngusContext extends Context {

    constructor() {
        super();
        Logger.createInstance("debug");
    }

    getLogger(method:string) {
        return Logger.getLogger(method)
    }
}