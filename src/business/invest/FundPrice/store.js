import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundPriceAPI} from "@services/invest";

export class Store {
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
}
