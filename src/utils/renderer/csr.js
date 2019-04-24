/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Loadable from 'react-loadable';

import App from '../../client/index';

const Capture = Loadable.Capture;

const clientSideRender = (modules = []) => (
    Loadable.preloadReady().then(() => {
        render(
            <Capture report={moduleName => modules.push(moduleName)}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Capture>,
            document.getElementById('root'),
            () => document.body.removeChild(document.body.lastElementChild)
        );
    })
);

export default clientSideRender;
