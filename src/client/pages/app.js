/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/app.css';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>App</title>
                </Helmet>
                <Link to="/">THIS IS APP PAGE.</Link>
            </div>
        );
    }
}

export {App};
export default App;
