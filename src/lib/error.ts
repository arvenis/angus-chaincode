export enum ERRORCODE {
    ACCESS_DENIED,
    INTERNAL_ERROR,
    INVALID_SERVICE
};

const ERRORMESSAGE:string[] = [
    "|ACCESS_DENIED|The access is denied for the user (authorization error)|",
    "|INTERNAL_ERROR|We don't know exactly what happened... Check the logs and good luck!|",
    "|INVALID_SERVICE|The requested chaincode service doesn't exist|"
];

export class AngusChaincodeError extends Error {
    code: ERRORCODE;

    constructor(code: ERRORCODE) {
        super(ERRORMESSAGE[code]);
    }
  }