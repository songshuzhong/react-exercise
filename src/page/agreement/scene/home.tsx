/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import react, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {Carousel} from '../../../components/common/carousel';
import {Cropper} from '../../../components/common/cropper';
import {CityPicker} from '../../../components/common/city-picker';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: '',
            isShowing: false,
        };

        this.closePicker = this.closePicker.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.OnCropImg = this.OnCropImg.bind(this);
    }

    public OnCropImg(crop) {
        this.setState({crop});
    }

    public handleClick() {
        const {isShowing} = this.state;
        this.setState({isShowing: !isShowing});
    }

    public closePicker() {
        this.setState({isShowing: false});
    }

    public render() {
        const {isShowing} = this.state;

        return (
            <React.Fragment>
                <Helmet key="helmet">
                    <title>Home</title>
                </Helmet>
                <Carousel onClick={this.handleClick}>
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
                <CityPicker show={isShowing} onOK={this.closePicker} onClose={this.closePicker} />
                <Link key="link" to="/about">
                    THIS IS HOME HOME.
                </Link>
            </React.Fragment>
        );
    }
}

export {Home};
export default Home;
