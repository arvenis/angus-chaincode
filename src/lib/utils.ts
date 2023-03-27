import { Timestamp } from 'fabric-shim';

export function fabricTimestampToNumber(timestamp: Timestamp): any {
    const milliseconds = (timestamp.seconds.low + timestamp.nanos / 1000000 / 1000) * 1000;
    return new Date(milliseconds).getTime();
}
