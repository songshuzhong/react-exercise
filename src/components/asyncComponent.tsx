/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React from 'react';
import Loadable from 'react-loadable';
import ErrorCatch from './errorCatch';

const Loading = props => <div />;

const asyncComponent = loader =>
    Loadable({
        loader: loader,
        loading: Loading,
        render(loaded, props) {
            let Component = loaded.default;
            return (
                <ErrorCatch>
                    <Component {...props} />
                </ErrorCatch>
            );
        },
    });

export {asyncComponent};
export default asyncComponent;
