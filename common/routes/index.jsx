import React from 'react';
import {Route} from 'react-router';

import App from '../components/App';
import Home from '../containers/Home';

import DbTest from '../containers/DbTest';
import {GalleriesContainer} from '../containers/Galleries';
import {ArtContainer} from '../containers/Art';


const routes = (
    <Route component={App}>
        <Route path='/' component={GalleriesContainer} />
        <Route path='/home' component={Home} />
        <Route path='/art' component={ArtContainer} />
    </Route>
);

export default routes;
