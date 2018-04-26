import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import {
    article
} from '../actionCreators';
import { Article } from '../components';

const {
    loadParagraphs
} = article;

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const articleURL = parse(this.props.location.search).articleURL;
        this.props.loadParagraphs(articleURL)
    }

    render() {
        return <Article {...this.props}/>
    }
}

const mapStateToProps = state => ({
    articleInfo: state.article.articleInfo,
    loading: state.common.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadParagraphs
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleContainer);