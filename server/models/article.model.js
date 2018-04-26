const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RemarkSchema = new Schema({
    text: String,
    comment: String
});

const FigureChildrenSchema = new Schema({
    tagName: String,
    src: String,
    text: String
});

const ParagraphSchema = new Schema({
    tagName: String,
    classes: [String],
    text: String,
    type: String,
    children: [FigureChildrenSchema],
    remarks: [RemarkSchema]
});

const ArticleSchema = new Schema({
    articleUrl: {
        type: String,
        required: true
    },
    paragraphs: [ParagraphSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);