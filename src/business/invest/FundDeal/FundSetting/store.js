import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundAPI} from "@services/invest";

export class Store {
    @observable data = [];
    @observable keyword = "";
    @observable lastModifyDate = Date.now();

    get queryParams() {
        return {
            "keyword": this.keyword
        };
    }

    @action
    loadData() {
        this.lastModifyDate = Date.now();
    }

    @action
    asyncDeleteData(record) {
        fundAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
