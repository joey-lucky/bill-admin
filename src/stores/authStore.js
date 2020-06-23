import {observable} from "mobx";
import {login as apiLogin} from "@services";
import {setToken} from "@utils/request";
import {getUserInfo} from "@services/safe";

class Store {
    @observable userInfo = {};

    get userId(){
        return this.userInfo.id;
    }

    asyncGetUserInfo(){
        getUserInfo().then(d=>{
            this.userInfo = d.data && d.data[0] || {};
        });
    }

    async login(account, password) {
        let d = await apiLogin(account, password);
        setToken(d.data[0].token);
        this.userInfo = d.data[0];
        return d;
    }
}
export default new Store();
