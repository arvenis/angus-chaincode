import _ from 'lodash';
import { AngusContext } from './context';
import { AngusModel } from './model';
import { HistoryItem } from './types';
import { fabricTimestampToNumber } from './utils';

export class AngusController {
    ctx: AngusContext;
    name: string;
    supportedClasses: any;

    constructor(ctx: AngusContext, listName: string) {
        this.ctx = ctx;
        this.name = listName;
        this.supportedClasses = {};
    }

    // We can't override, modify the composit key creation logic because of the AngusModel.splitKey usage in this file
    createCompositeKey(name: string, keys: string[]) {
        return _.join([name, AngusModel.makeKey(keys)], '.');
    }

    async addModel(model: AngusModel) {
        let key: string = this.createCompositeKey(this.name, model.getSplitKey());
        let data = AngusModel.serialize(model);
        await this.ctx.stub.putState(key, data);
    }

    async getModel(key: string) {
        let ledgerKey: string = this.createCompositeKey(this.name, AngusModel.splitKey(key));
        let data = await this.ctx.stub.getState(ledgerKey);
        let state: undefined;
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

    async getModelList(query: object) {
        this.ctx.getLogger('getModelList').debug('query', query);
        const iterator = await this.ctx.stub.getQueryResult(JSON.stringify(query));
        const allResults = [];

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const strValue = Buffer.from(res.value.value).toString('utf8');
                let record;
                try {
                    record = _.get(JSON.parse(strValue), 'data');
                } catch (err) {
                    this.ctx.getLogger('getModelList').error(err);
                    record = strValue;
                }
                allResults.push(record);
            }
            if (res.done) {
                await iterator.close();
                return allResults;
            }
        }
    }

    /**
     * Get History of a single model.
     * It returns the chain of custody for an asset since issuance.
     **/
    async getModelHistory(key: string): Promise<HistoryItem[]> {
        this.ctx.getLogger('getModelHistory').debug(`Key: ${key}`);
        let ledgerKey: string = this.createCompositeKey(this.name, AngusModel.splitKey(key));
        let iterator = await this.ctx.stub.getHistoryForKey(ledgerKey);
        const allResults = [];

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let historyItem: HistoryItem = {
                    txId: res.value.txId,
                    timestamp: fabricTimestampToNumber(res.value.timestamp),
                    value: {},
                };
                const strValue = Buffer.from(res.value.value).toString('utf8');
                try {
                    historyItem.value = _.get(JSON.parse(strValue), 'data');
                } catch (err) {
                    this.ctx.getLogger('getModelHistory').error(err);
                    historyItem.value = strValue;
                }
                allResults.push(historyItem);
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
