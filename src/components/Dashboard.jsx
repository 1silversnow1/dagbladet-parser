import React, { Component, Fragment } from 'react';

import { createAction } from '../utils';

import {
    dashboard
} from '../actionCreators';
const { approveRemark, deleteRemark } = dashboard;

export default class Dashboard extends Component {

    static renderArticles(articles) {
        return articles.map((article, index) => <Article key={index}
                                                         onApprove={Dashboard.onApprove}
                                                         onDelete={Dashboard.onDelete}
                                                         onApproveCustomRemark={Dashboard.onApproveCustomRemark}
                                                         {...article}/>)
    }

    static onApprove(data) {
        createAction(approveRemark(data));
    }

    static onDelete(data) {
        createAction(deleteRemark(data));
    }

    static onApproveCustomRemark(data) {
        createAction(approveRemark(data));
    }

    render() {
        return <div className="article-wrapper container">
            {Dashboard.renderArticles(this.props.dashboardInfo)}
        </div>
    }
}

function Remark(props) {
    const approveRemark = () => props.onApprove({
        articleId: props.articleId,
        paragraphId: props.paragraphId,
        remarkId: props._id,
        text: props.text
    });
    const deleteRemark = () => props.onDelete({
        articleId: props.articleId,
        paragraphId: props.paragraphId,
        remarkId: props._id
    });

    return <div className="card">
        <div className="card-body">
            <p><span className="bold">Remark text:</span> {props.text}</p>
            {props.comment && <p><span className="bold">Comment:</span> {props.comment}</p>}
            <div className="article-control__remark-controls">
                <button type="button" className="btn btn-success" onClick={approveRemark}>Approve</button>
                <button type="button" className="btn btn-danger" onClick={deleteRemark}>Delete</button>
            </div>
        </div>
    </div>
}

class Paragraph extends Component {

    constructor(props) {
        super(props);

        this.figcaption = props.tagName === 'figure'
            && props.children.find(child => child.tagName === 'figcaption');

        this.textarea = React.createRef();

        this.approveCustomRemark = this.approveCustomRemark.bind(this);
    }

    approveCustomRemark() {
        this.props.onApproveCustomRemark({
            articleId: this.props.articleId,
            paragraphId: this.props._id,
            text: this.textarea.current.value
        });
    }

    renderRemarks(remark) {
        return remark.map((remark, index) => <Remark key={index}
                                                     articleId={this.props.articleId}
                                                     paragraphId={this.props._id}
                                                     onApprove={this.props.onApprove}
                                                     onDelete={this.props.onDelete}
                                                     {...remark}/>)
    }

    render() {
        return <div className="article-control__paragraph">
            <div className="card">
                <div className="card-body">
                    {this.props.text || (this.figcaption && this.figcaption.text)}
                </div>
            </div>
            <div className="article-control__remarks">
                <div className="card">
                    <div className="card-body">
                        <p>Approve custom remarks</p>
                        <textarea ref={this.textarea}
                                  className="form-control"
                                  rows="3"></textarea>
                        <button type="button" className="btn btn-success" onClick={this.approveCustomRemark} style={{'marginTop': '15px'}}>Approve</button>
                    </div>
                </div>
                {this.renderRemarks(this.props.remarks)}
            </div>
        </div>
    }
}

function Article(props) {
    const renderParagraphs = (paragraphs) => {
        return paragraphs.map((paragraph, index) => <Paragraph key={index}
                                                               articleId={props._id}
                                                               onApprove={props.onApprove}
                                                               onDelete={props.onDelete}
                                                               onApproveCustomRemark={Dashboard.onApproveCustomRemark}
                                                               {...paragraph} />)
    }

    return <div className="article-control">
        <div className="article-control__header">
            <div className="bg-dark text-white card">
                <div className="card-body">
                    {props.articleUrl}
                </div>
            </div>
            {renderParagraphs(props.paragraphs)}
        </div>
    </div>
}