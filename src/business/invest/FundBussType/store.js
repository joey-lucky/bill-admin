import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundBussTypeAPI} from "@services/invest";

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
        fundBussTypeAPI.index(this.queryParams).then((d) => {
           let data  = d.data || [];
            deleteAllEmptyChildren(data)
            this.data = data;
        });
    }

    @action
    asyncDeleteData(record) {
        fundBussTypeAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
