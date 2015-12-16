import 'babel-polyfill'
import React from 'react';
import ReactDom from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';

import store from '../common/store';
import history from '../common/routes/history';
import routes from '../common/routes';


ReactDom.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
