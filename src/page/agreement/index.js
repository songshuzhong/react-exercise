/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date 2019/04/07
 *@desc 创作者注册
 */

import * as React from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'mobx-react';

import {asyncRouter} from '../../components/asyncRouter';

import stores from '../../action';

render(
    <Provider store={stores}>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={asyncRouter(() => import('./scene/home'))}/>
                <Route exact path='/app' component={asyncRouter(() => import('./scene/app'))}/>
                <Route exact path='/about' component={asyncRouter(() => import('./scene/about'))}/>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
