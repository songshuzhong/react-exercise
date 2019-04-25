/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {Carousel} from '../components/common/carousel';
import uaParser from '../../utils/ua-detect';

import '../styles/home.less';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Helmet key='helmet'>
                    <title>Home</title>
                </Helmet>
                <Carousel>
                    <div className="item">
                        <img src='http://laichuanfeng.com/demo/carousel/carousel_1.jpg' />
                    </div>
                    <div className="item">
                        <img src='http://laichuanfeng.com/demo/carousel/carousel_2.jpg' />
                    </div>
                    <div className="item">
                        <img src='http://laichuanfeng.com/demo/carousel/carousel_3.jpg' />
                    </div>
                    <div className="item">
                        <img src='http://laichuanfeng.com/demo/carousel/carousel_4.jpg' />
                    </div>
                    <div className="item">
                        <img src='http://laichuanfeng.com/demo/carousel/carousel_5.jpg' />
                    </div>
                </Carousel>
                <Link key='link' to="/about">THIS IS HOME HOME.</Link>
            </React.Fragment>
        );
    }
}

export {Home};
export default Home;
