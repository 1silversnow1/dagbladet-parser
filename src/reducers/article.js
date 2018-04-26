import {
    article,
} from '../actionTypes';

const { ON_LOAD_PARAGRAPHS } = article;

const initialState = {
    articleInfo: {
        articleURL: '',
        paragraphs: []
    }
}

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case ON_LOAD_PARAGRAPHS:
            return {
                ...state,
                articleInfo: action.payload
            }
        default:
            return state
    }
}