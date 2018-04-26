import {
    common
} from '../actionTypes';

const { LOAD, ON_LOAD } = common;

const initialState = {
    loading: false
}

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            }
        case ON_LOAD:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}