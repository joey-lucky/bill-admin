import {getApiPath} from "../global";
import {RestFullApi} from "./rest-full-api";

export const fundTypeAPI = new RestFullApi(getApiPath() + "/invest/fund-type");
export const fundBussTypeAPI = new RestFullApi(getApiPath() + "/invest/fund-buss-type");
