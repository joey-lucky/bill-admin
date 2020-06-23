import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundDealAPI} from "@services/invest";

export class Store {
    @observable data = [];
    @observable keyword = "";

    get queryParams() {
        return {
            "keyword": this.keyword
        };
    }

    @action
    loadData() {
        fundDealAPI.index(this.queryParams).then((d) => {
           let data  = d.data || [];
            deleteAllEmptyChildren(data)
            this.data = data;
        });
    }

    @action
    asyncDeleteData(record) {
        fundDealAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
