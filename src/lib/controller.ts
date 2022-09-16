import { AngusContext } from './context';
import { AngusModel } from './model';

import _ from 'lodash';

export class AngusController {

    ctx: AngusContext;
    name: string;
    supportedClasses: any;

    constructor(ctx: AngusContext, listName: string) {
        this.ctx = ctx;
        this.name = listName;
        this.supportedClasses = {};

    }

    createCompositeKey(name: string, keys: string[]) {
        return _.join([name, AngusModel.makeKey(keys)], '.');
    }

    async addModel(model: AngusModel) {
        let key: string = this.createCompositeKey(this.name, model.getSplitKey());
        let data = AngusModel.serialize(model);
        await this.ctx.stub.putState(key, data);
    }

    async getModel(key:string) {
        let ledgerKey:string = this.createCompositeKey(this.name, AngusModel.splitKey(key));
        let data = await this.ctx.stub.getState(ledgerKey);
        let state: any;
        if (!_.isEmpty(data)) {
            state = AngusModel.deserialize(data, this.supportedClasses);
        }
        return state;
    }

    async updateModel(model: AngusModel) {
        let key: string = this.createCompositeKey(this.name, model.getSplitKey());
        let data = AngusModel.serialize(model);
        await this.ctx.stub.putState(key, data);
    }

    async deleteModel(model: AngusModel) {
        let key: string = this.createCompositeKey(this.name, model.getSplitKey());
        await this.ctx.stub.deleteState(key);
    }

    async getModelList(query:object) {
        const iterator = await this.ctx.stub.getQueryResult(JSON.stringify(query));
        const allResults = [];

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
              this.ctx.getLogger("getModelList").debug(JSON.stringify(res.value, null, 2));
              const strValue = Buffer.from(res.value.value).toString("utf8");
              let record;
              try {
                  record = JSON.parse(strValue);
              } catch (err) {
                  this.ctx.getLogger("getModelList").error(err);
                  record = strValue;
              }
              allResults.push(record.data);
            }
            if (res.done) {
                await iterator.close();
                return allResults;
            }
        }

    }

    use(modelClass) {
        this.supportedClasses[modelClass.getClass()] = modelClass;
    }

}
