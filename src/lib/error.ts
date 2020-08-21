export enum AngusErrorCodes {
    ACCESS_DENIED,
    INTERNAL_ERROR,
    INVALID_SERVICE,
    ENTITY_ALREADY_EXISTS,
    ENTITY_NOT_EXIST
};

const ERRORMESSAGE:string[] = [
    "|ACCESS_DENIED|The access is denied for the user (authorization error)|",
    "|INTERNAL_ERROR|We don't know exactly what happened... Check the logs and good luck!|",
    "|INVALID_SERVICE|The requested chaincode service doesn't exist|",
    "|ENTITY_ALREADY_EXISTS|Entity already exists|",
    "|ENTITY_NOT_EXIST|The entity does not exist|"
];

export class AngusChaincodeError extends Error {
    code: AngusErrorCodes;

    constructor(code: AngusErrorCodes) {
        super(ERRORMESSAGE[code]);
    }
}
