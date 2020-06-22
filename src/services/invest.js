import {getApiPath} from "../global";
import {RestFullApi} from "./rest-full-api";

export const fundTypeAPI = new RestFullApi(getApiPath() + "/invest/fund-type");
export const fundAPI = new RestFullApi(getApiPath() + "/invest/fund");
export const fundBussTypeAPI = new RestFullApi(getApiPath() + "/invest/fund-buss-type");
export const fundBuyCommissionAPI = new RestFullApi(getApiPath() + "/invest/fund-buy-commission");
export const fundSellCommissionAPI = new RestFullApi(getApiPath() + "/invest/fund-sell-commission");
