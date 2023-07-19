import { Context } from 'fabric-contract-api';

const loggerPostfix = 'angus';

export class AngusContext extends Context {
    constructor() {
        super();
    }

    getLogger(method: string) {
        // The log message will be something like the following
        // [c-api:FooContract:getFoo][angus]
        return this.logging.getLogger(`${method}][${loggerPostfix}`);
    }
}
