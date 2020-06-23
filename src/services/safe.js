import request from "@utils/request";
import {getApiPath} from "../global";

export async function login(account, password) {
    let params = {
        userName: account,
        password: password
    };
    return request.apiGet(getApiPath() + '/safe/login', params);
}

export async function getPublicKey() {
    return request.index(getApiPath() + '/get-public-key', {});
}

export async function getUserInfo() {
    return request.apiGet(getApiPath() + '/safe/get-user-info', {});
}