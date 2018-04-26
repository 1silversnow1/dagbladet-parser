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
                {this.props.articleInfo.paragraphs.length
                    ? this.renderParagraphs()
                    : <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-7">There is no paragraphs to show</h1>
                            <p className="lead">Probably you provide incorect articleURL. Pass url with following format 'http://localhost:3000?articleURL=http://www.dagbladet.no/kjendis/supermodellen-ble-beskyldt-for-a-ikke-tipse-etter-et-barbesok-na-svarer-hun-pa-kritikken/68573788' and try again</p>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default Article;