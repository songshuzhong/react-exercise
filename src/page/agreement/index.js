/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date 2019/05/20
 *@desc 代码规范自动化校验
 */
import * as React from 'react';

import {render} from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {asyncRouter} from '../../components/asyncRouter';

render(
    <HashRouter>
        <Switch>
            <Route
                path="/"
                component={asyncRouter(() => import('./scene/home'))}
            />
            <Route
                path="/app"
                component={asyncRouter(() => import('./scene/app'))}
            />
            <Route
                path="/about"
                component={asyncRouter(() => import('./scene/about'))}
            />
        </Switch>
    </HashRouter>,
    document.getElementById('root'),
);
