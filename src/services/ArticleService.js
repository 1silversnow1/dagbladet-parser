import ApiClient from './ApiClient';

export default class ArticleService extends ApiClient {
    getArticle(articleURL) {
        return this.get(`/article`, {articleURL})
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    submitChanges(config) {
        return this.put(`/article/${config.articleId}/${config.paragraphId}`, {...config.data})
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
}