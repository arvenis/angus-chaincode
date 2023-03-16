import { AngusChaincodeError, AngusErrorCodes } from '../src';

describe('AngusChaincodeError', () => {
    describe('AngusChaincodeError constructor', () => {
        test('should return error in the same format with or without optional message input', () => {
            expect(new AngusChaincodeError(AngusErrorCodes.BAD_REQUEST)).toHaveProperty(
                'message',
                "|BAD_REQUEST|The request can't be processed due to a client error|"
            );
            expect(new AngusChaincodeError(AngusErrorCodes.BAD_REQUEST, 'TEST_MESSAGE')).toHaveProperty(
                'message',
                '|BAD_REQUEST|TEST_MESSAGE|'
            );
        });
    });
});
