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

import '../styles/about.css';

class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Helmet key='helmet'>
                    <title>About</title>
                </Helmet>
                <Link key='link' to="/app">THIS IS ABOUT PAGE.</Link>
            </React.Fragment>
        );
    }
}

export {About};
export default About;
