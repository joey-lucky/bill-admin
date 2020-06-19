import request from "@utils/request";

export class RestFullApi {
    url = "";

    constructor(url) {
        this.url = url;
    }

    show = async (id) => {
        return await request.show(this.url, id);
    };

    index = async (params = {}) => {
        return await request.index(this.url, params);
    };

    create = async (params) => {
        return await request.create(this.url, params);
    };

    destroy = async (id) => {
        return await request.destroy(this.url, id);
    };

    update = async (params) => {
        return await request.update(this.url, params.id, params);
    };
}
