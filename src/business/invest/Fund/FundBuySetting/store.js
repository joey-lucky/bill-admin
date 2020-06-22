import {action, observable} from "mobx";
import {deleteAllEmptyChildren} from "@utils/treeDataUtils";
import {fundBuyCommissionAPI} from "@services/invest";

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
        fundBuyCommissionAPI.index(this.queryParams).then((d) => {
           let data  = d.data || [];
            deleteAllEmptyChildren(data)
            this.data = data;
        });
    }

    @action
    asyncDeleteData(record) {
        fundBuyCommissionAPI.destroy(record.id).then(() => {
            this.loadData();
        });
    }
}
