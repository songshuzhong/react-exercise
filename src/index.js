/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from './routers/index';
import NoMatch from './components/noMatch';

import 'nprogress/nprogress.css';

class Application extends Component {

    render() {
        return (
            <Switch>
                {routes.map(route => <Route key={route.path} exact={route.exact} path={route.path}
                                            component={route.component}/>)}
                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

export default Application;
