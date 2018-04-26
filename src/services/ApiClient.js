import axios from 'axios';
import { stringify } from 'query-string';

export default class ApiClient {
    constructor(baseURL = `http://localhost:3000`) {
        axios.defaults.baseURL = baseURL;
        axios.defaults.responseType = 'json';
    }

    get(requestUrl, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            params,
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload,
        });
    }

    post(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload,
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete',
        });
    }

    request({url, method, params = {}, body}) {
        const init = {
            method,
            url: `${url}?${stringify(params)}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        if (method !== 'get') {
            init.data = JSON.stringify(body);
        }

        return axios(init);
    }
}
