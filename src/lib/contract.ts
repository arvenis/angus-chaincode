import { Contract } from 'fabric-contract-api';
import { AngusContext } from './context';
import { AngusChaincodeError, ERRORCODE } from './error';

import _ from 'lodash';

export class AngusContract extends Contract {
    LOGLEVEL:string="";

    async beforeTransaction(ctx: AngusContext) {
        if (!_.isEmpty(this.LOGLEVEL)) ctx.logger.setLevel(this.LOGLEVEL);
        ctx.getLogger("beforeTransaction").info(`Start ${ctx.stub.getFunctionAndParameters().fcn}`);
    }

    async unknownTransaction(ctx:AngusContext) {
        ctx.getLogger("unknownTransaction").error(`Unknown service called: ${ctx.stub.getFunctionAndParameters().fcn}`);
        throw new AngusChaincodeError(ERRORCODE.INVALID_SERVICE); 
    }
} 