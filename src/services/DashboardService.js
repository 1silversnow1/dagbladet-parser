import ApiClient from './ApiClient';

export default class DashboardService extends ApiClient {
    getDashboardInfo() {
        return this.get(`/article/all`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    approveRemark({articleId, paragraphId, remarkId, text}) {
        return this.put(`/article/${articleId}/${paragraphId}/${remarkId}`, {text})
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    deleteRemark({articleId, paragraphId}) {
        return this.delete(`/article/${articleId}/${paragraphId}`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }
}