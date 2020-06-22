import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundSellCommissionAPI} from "@services/invest";

export class Store {
    @observable data = [];
    @observable keyword = "";
    @observable fundId = "";
    @observable fundName = "";

    get queryParams() {
        return {
            "keyword": this.keyword,
            fundId:this.fundId,
        };
    }

    @action
    loadData() {
        fundSellCommissionAPI.index(this.queryParams).then((d) => {
           let data  = d.data || [];
            deleteAllEmptyChildren(data)
            this.data = data;
        });
    }

    @action
    asyncDeleteData(record) {
        fundSellCommissionAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
