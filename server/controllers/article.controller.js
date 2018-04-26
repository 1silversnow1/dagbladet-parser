import request from 'request-promise';
import cheerio from 'cheerio';
import ArticleModel from '../models/article.model';
import ArticleService from '../services/article.service';

export const getOne = function(req, res, next) {
    const {articleURL} = req.query;

    ArticleModel.findOne({articleUrl: articleURL}).then(result => {
        if (result) {
            res.json(result);
        } else {
            return request(articleURL);
        }
    }).then((html) => {
        if (!html) return;

        const $ = cheerio.load(html);

        const articleService = new ArticleService($);
        const parsedArticle = articleService.parse('article.article-entity');

        const newArticle = new ArticleModel({
            articleUrl: articleURL,
            paragraphs: parsedArticle,
        });

        newArticle.save((err, result) => {
            if (err) {
                console.log('Error saving article');
            }
            console.log('Article saved!');
            res.status(200).json(result);
        });
    }).catch(err => {
        console.log(err);

    });
};

export const addRemark = function(req, res, next) {
    const {articleId, paragraphId} = req.params;
    const remark = {
        text: req.body.text,
        comment: req.body.comment,
    };

    ArticleModel.update(
        {_id: articleId, 'paragraphs._id': paragraphId},
        {$push: {'paragraphs.$.remarks': remark}}
    ).exec(function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json('Ok');
        }
    });
};

export const getMany = function(req, res, next) {
    ArticleModel.find({}).then(result => {
        if (result) {
            res.json(result);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

export const approveRemark = function(req, res, next) {
    const { articleId, paragraphId } = req.params;
    const { text } = req.body;

    ArticleModel.update(
        {'_id': articleId, 'paragraphs._id': paragraphId},
        {$set: {'paragraphs.$.text': text}}
    ).exec(function(err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('OK');
        }
    });
};

export const deleteRemark = function(req, res, next) {
    const { articleId, paragraphId, remarkId } = req.params;

    ArticleModel.update(
        {'_id': articleId, 'paragraphs._id': paragraphId},
        {$pull: {'paragraphs.$.remarks': {_id: remarkId}}}
    ).exec(function(err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('OK');
        }
    });
};