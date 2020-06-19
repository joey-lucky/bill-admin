import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundTypeAPI} from "@services/invest";

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
        fundTypeAPI.index(this.queryParams).then((d) => {
           let data  = d.data || [];
            deleteAllEmptyChildren(data)
            this.data = data;
        });
    }

    @action
    asyncDeleteData(record) {
        fundTypeAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
