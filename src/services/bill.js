// conf
import {RestFullApi} from "@services/rest-full-api";
import {getApiPath} from "../global";

export const userAPI = new RestFullApi(getApiPath() + "/user");
export const billTypeAPI = new RestFullApi(getApiPath() + "/bill-type");
export const cardAPI = new RestFullApi(getApiPath() + "/card");
export const cardTypeAPI = new RestFullApi(getApiPath() + "/card-type");
export const dictTypeAPI = new RestFullApi(getApiPath() + "/dict-type");
export const dictDataAPI = new RestFullApi(getApiPath() + "/dict-data");
export const billTemplateAPI = new RestFullApi(getApiPath() + "/bill-template");
// data
export const billAPI = new RestFullApi(getApiPath() + "/bill");
billAPI.exportExcel = () => window.open(getApiPath() + "/bill/export-excel", "_blank");