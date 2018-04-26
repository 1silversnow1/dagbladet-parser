import React, {Fragment, Component} from 'react';
import classnames from 'classnames';

import { withFormControl } from '../hocs';
import { createAction } from '../utils';
import {
    article
} from '../actionCreators';
const { submitChanges } = article;

const TextWithFormControl = withFormControl(Text);
const ImageBlockWithFormControl = withFormControl(ImageBlock);

class Paragraph extends Component {

    static defineState(paragraph) {
        const state = {
            tagName: paragraph.tagName,
            type: paragraph.type,
            paragraphId: paragraph._id
        };
        if (paragraph.tagName === 'figure') {
            const imgTag = paragraph.children.find(tag => tag.tagName === 'img');
            const figcaptionTag = paragraph.children.find(tag => tag.tagName === 'figcaption');
            state.src = imgTag && imgTag.src || '';
            state.text = figcaptionTag && figcaptionTag.text || '';
        } else {
            state.text = paragraph.text;
        }

        return state;
    }

    constructor(props) {
        super(props);

        this.state = {
            articleId: props.articleId,
            ...Paragraph.defineState(props.paragraph),
        };

        this.submit = this.submit.bind(this);
    }

    submit(data) {
        const config = {
            data,
            articleId: this.state.articleId,
            paragraphId: this.state.paragraphId,

        }
        createAction(submitChanges(config));
    }

    render() {
        const {text, type, src, tagName} = this.state;

        return <article className="paragraph-card card">
            <header className="card-header">
                #{this.props.index + 1} {type}
            </header>
            {tagName === 'figure'
                ? <ImageBlockWithFormControl src={src}
                                             text={text}
                                             submit={this.submit}/>
                : <TextWithFormControl text={text}
                                       submit={this.submit}/>}
        </article>;
    }
}

function Text(props) {
    return <p className={classnames({'hidden': (props.controlMode && props.controlMode === 'edit'), 'card-text': true})}>{props.text}</p>;
}

function ImageBlock(props) {
    return <Fragment>
        <p>
            {props.src && <img className="paragraph-img" src={props.src}/>}
        </p>
        <p className={classnames({'hidden': (props.controlMode && props.controlMode === 'edit')})}>{props.text && props.text}</p>
    </Fragment>;
}

export default Paragraph;