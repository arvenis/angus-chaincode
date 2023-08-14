import _ from 'lodash';
import { AngusChaincodeError, AngusErrorCodes } from './error';

export class AngusModel {
    class: string;
    key: string;
    currentState: string;

    /**
     * @param {String|Object} class  An indentifiable class of the instance
     * @param {keyParts[]} elements to pull together to make a key for the objects
     */
    constructor(stateClass: string, keyParts: string[]) {
        this.class = stateClass;
        this.key = AngusModel.makeKey(keyParts);
        this.currentState = null;
    }

    getClass() {
        return this.class;
    }

    getKey() {
        return this.key;
    }

    getSplitKey() {
        return AngusModel.splitKey(this.key);
    }

    getCurrentState() {
        return this.currentState;
    }

    serialize() {
        return AngusModel.serialize(this);
    }

    /**
     * Convert object to buffer containing JSON data serialization
     * Typically used before putState()ledger API
     * @param {Object} JSON object to serialize
     * @return {buffer} buffer with the data to store
     */
    static serialize(object: Object) {
        return Buffer.from(JSON.stringify(object));
    }

    /**
     * Deserialize object into one of a set of supported JSON classes
     * i.e. Convert serialized data to JSON object
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @param (supportedClasses) the set of classes data can be serialized to
     * @return {json} json with the data to store
     */
    static deserialize(data, supportedClasses) {
        let json = JSON.parse(data.toString());
        let objClass = supportedClasses[json.class];
        if (!objClass) {
            throw new AngusChaincodeError(AngusErrorCodes.INTERNAL_ERROR, null, `Unknown class of ${json.class}`);
        }
        let object = new objClass(json);

        return object;
    }

    /**
     * Deserialize object into specific object class
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @return {json} json with the data to store
     */
    static deserializeClass(data, objClass) {
        let json = JSON.parse(data.toString());
        let object = new objClass(json);
        return object;
    }

    /**
     * Join the keyParts to make a unififed string
     * @param (String[]) keyParts
     */
    static makeKey(keyParts: string[]): string {
        return _.join(keyParts, ':');
    }

    static splitKey(key): string[] {
        return _.split(key, ':');
    }
}
