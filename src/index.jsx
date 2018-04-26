import React, {Fragment} from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Notifs } from 'redux-notifications';

import store, { history } from './createStore';
import App from './App.jsx';

import 'redux-notifications/lib/styles.css';
import '../public/styles/main.scss';

render(
    <Provider store={store}>
        <Fragment>
            <ConnectedRouter history={history}>
                <div>
                    <App/>
                </div>
            </ConnectedRouter>
            <Notifs/>
        </Fragment>
    </Provider>,
    document.querySelector('#root')
);