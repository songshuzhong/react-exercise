/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date 2019/04/07
 *@desc 创作者注册
 */
import * as React from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {asyncRouter} from '../../components/asyncRouter';

render(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={asyncRouter(() => import('./scene/app'))} />
            <Route exact path='/pre' component={asyncRouter(() => import('./scene/home'))} />
            <Route exact path='/verify' component={asyncRouter(() => import('./scene/about'))} />
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
