export enum AngusErrorCodes {
    ACCESS_DENIED,
    INTERNAL_ERROR,
    BAD_REQUEST,
    INVALID_SERVICE,
    ENTITY_ALREADY_EXISTS,
    ENTITY_NOT_EXIST,
}

// (AN)gus (CC)chaincode (CO)re (001) (E)rror
// Order should be the same as in the AngusErrorCodes above
const ERRORMESSAGE: string[] = [
    '|ACCESS_DENIED|ANCCCO001E|The access is denied for the user (authorization error)|',
    '|INTERNAL_ERROR|ANCCCO002E||',
    "|BAD_REQUEST|ANCCCO003E|The request can't be processed due to a client error|",
    "|INVALID_SERVICE|ANCCCO004E|The requested chaincode service doesn't exist|",
    '|ENTITY_ALREADY_EXISTS|ANCCCO005E|Entity already exists|',
    '|ENTITY_NOT_EXIST|ANCCCO006E|The entity does not exist|',
];

export class AngusChaincodeError extends Error {
    code: AngusErrorCodes;

    constructor(code: AngusErrorCodes, message?: string, details?: string) {
        let errorMessage = ERRORMESSAGE[code];
        const originalMessage = errorMessage.split('|');
        if (message) {
            // Replace the error message for the given one.
            originalMessage[2] = message;
        }
        if (details) {
            // Replace the error message for the given one.
            originalMessage[3] = details;
        }

        super(originalMessage.join('|'));
    }
}
