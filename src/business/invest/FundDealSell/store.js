import {action, observable} from "mobx";
import {fundDealSellAPI} from "@services/invest";

export class Store {
    @observable data = [];
    @observable keyword = "";
    @observable lastModifyDate = Date.now();
    @observable defaultParams = {};

    get queryParams() {
        return {
            ...this.defaultParams,
            "keyword": this.keyword
        };
    }

    @action
    loadData() {
        this.lastModifyDate = Date.now();
    }

    @action
    asyncDeleteData(record) {
        fundDealSellAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
