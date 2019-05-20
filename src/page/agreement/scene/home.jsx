/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {Carousel} from '../../../components/common/carousel';
import {Cropper} from '../../../components/common/cropper';
import {ProvincePicker} from '../../../components/common/province-picker';

import '../../../styles/home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: '',
            isShowing: false,
        };
        this.OnCropImg = this.OnCropImg.bind(this);
    }

    OnCropImg(crop) {
        this.setState({crop});
    }

    render() {
        return (
            <React.Fragment>
                <Helmet key="helmet">
                    <title>Home</title>
                </Helmet>
                <Carousel>
                    <div className="item">
                        <img src="http://laichuanfeng.com/demo/carousel/carousel_1.jpg" />
                    </div>
                    <div className="item">
                        <img src="http://laichuanfeng.com/demo/carousel/carousel_2.jpg" />
                    </div>
                    <div className="item">
                        <img src="http://laichuanfeng.com/demo/carousel/carousel_3.jpg" />
                    </div>
                    <div className="item">
                        <img src="http://laichuanfeng.com/demo/carousel/carousel_4.jpg" />
                    </div>
                    <div className="item">
                        <img src="http://laichuanfeng.com/demo/carousel/carousel_5.jpg" />
                    </div>
                </Carousel>
                <Cropper getCropImg={this.OnCropImg} />
                <ProvincePicker
                    getProvince={p => console.log(p)}
                    getCity={c => console.log(c)}
                />
                <Link key="link" to="/about">
                    THIS IS HOME HOME.
                </Link>
            </React.Fragment>
        );
    }
}

export {Home};
export default Home;
