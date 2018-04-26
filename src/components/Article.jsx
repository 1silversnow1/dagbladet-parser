import React, { Component, Fragment } from 'react';
import Paragraph from './Paragraph';

class Article extends Component {
    constructor(props) {
        super(props);
        this.renderParagraphs = this.renderParagraphs.bind(this);
    }

    renderParagraphs() {
        return this.props.articleInfo.paragraphs
            .map((paragraph, index) => <Paragraph key={paragraph._id}
                                                  articleId={this.props.articleInfo._id}
                                                  index={index}
                                                  paragraph={paragraph}/>)
    }

    render() {
        return (
            <div className="article-wrapper container">
                {this.renderParagraphs()}
            </div>
        )
    }
}

export default Article;