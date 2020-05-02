import { AngusModel } from './model';
import { AngusContext } from './context';

import _ from 'lodash';

export default class AngusController {

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

                const Key = res.value.key;
                let _rec: any;
                try {
                    _rec = JSON.parse(res.value.value.toString());
                } catch (err) {
                    _rec = res.value.value.toString();
                }
                allResults.push(_rec.data);
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
