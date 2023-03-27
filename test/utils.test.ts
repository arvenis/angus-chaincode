import { Timestamp } from 'fabric-shim';
import Long from 'long';
import { fabricTimestampToNumber } from '../src/lib/utils';

describe('Utils Tests', () => {
    describe('fabricTimestampToNumber', () => {
        test('should return number', () => {
            const fabricTimestamp: Timestamp = { seconds: Long.fromInt(1234), nanos: 55 };
            expect(fabricTimestampToNumber(fabricTimestamp)).toEqual(1234000);
        });
    });
});
