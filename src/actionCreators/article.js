import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;
import {articleService} from '../services';

import { article, common } from '../actionTypes';
const { ON_LOAD_PARAGRAPHS } = article;
const { LOAD, ON_LOAD } = common;

export const loadParagraphs = (articleURL) => {
    return dispatch => {
        dispatch({
            type: LOAD
        });

        if (articleURL) {
            articleService.getArticle(articleURL)
                .then(res => {
                    dispatch({
                        type: ON_LOAD_PARAGRAPHS,
                        payload: res
                    });
                })
                .catch(err => {
                    console.error(e);
                    dispatch({
                        type: ON_ERROR,
                        payload: e
                    });
                });
        } else {
            console.log('You should provide article URL');
        }

        dispatch({
            type: ON_LOAD
        });
    }
}

export const submitChanges = (config) => {
    return dispatch => {
        articleService.submitChanges(config)
            .then(res => {
                dispatch(notifSend({
                    message: 'Changes have sent and will be considered',
                    kind: 'success',
                    dismissAfter: 3000
                }));
                console.log('Changes submited');
            })
            .catch(err => {
                console.error(e);
                dispatch({
                    type: ON_ERROR,
                    payload: e
                });
            });
    }
}
