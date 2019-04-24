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
                <Carousel auto={false} time={5000} pointer="rectangle" cStyle={{paddingBottom: '100px'}} pColor="#5E5E5E">
                    {
                        [1, 2, 3, 4, 5].map(index => <div className="item">
                            <img src={`http://laichuanfeng.com/demo/carousel/carousel_${index + 1}.jpg`} />
                        </div>)
                    }
                </Carousel>
                <Link key='link' to="/about">THIS IS HOME HOME.</Link>
            </React.Fragment>
        );
    }
}

export {Home};
export default Home;
