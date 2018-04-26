import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifReducer } from 'redux-notifications';

import article from './article.js';
import dashboard from './dashboard.js';
import common from './common.js';

export default combineReducers({
    routing: routerReducer,
    notifs: notifReducer,
    article,
    dashboard,
    common
});