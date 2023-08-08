export enum AngusErrorCodes {
    ACCESS_DENIED,
    INTERNAL_ERROR,
    BAD_REQUEST,
    INVALID_SERVICE,
    ENTITY_ALREADY_EXISTS,
    ENTITY_NOT_EXIST,
}

// Order should be the same as in the AngusErrorCodes above
const ERRORMESSAGE: string[] = [
    '|ACCESS_DENIED|The access is denied for the user (authorization error)|',
    "|INTERNAL_ERROR|We don't know exactly what happened... Check the logs and good luck!|",
    "|BAD_REQUEST|The request can't be processed due to a client error|",
    "|INVALID_SERVICE|The requested chaincode service doesn't exist|",
    '|ENTITY_ALREADY_EXISTS|Entity already exists|',
    '|ENTITY_NOT_EXIST|The entity does not exist|',
];

export class AngusChaincodeError extends Error {
    code: AngusErrorCodes;

    constructor(code: AngusErrorCodes, message?: string, details?: string) {
        let errorMessage = ERRORMESSAGE[code];
        if (message) {
            // Replace the error message for the given one.
            const originalMessage = errorMessage.split('|');
            errorMessage = ['', originalMessage[1], message, ''].join('|');
        }
        if (details) {
            errorMessage += details + '|';
        }
        super(errorMessage);
    }
}
