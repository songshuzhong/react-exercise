/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Carousel } from "../../../components/common/carousel";
import { CityPicker } from "../../../components/common/city-picker";

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      crop: "",
      isShowing: false
    };

    this.okPicker = this.okPicker.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.OnCropImg = this.OnCropImg.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isShowing: true }), 500);
  }

  OnCropImg(crop) {
    this.setState({ crop });
  }

  handleClick() {
    const { isShowing } = this.state;
    this.setState({ isShowing: !isShowing });
  }

  okPicker(...args) {
    console.log(args);
    this.setState({ isShowing: false });
  }

  closePicker() {
    this.setState({ isShowing: false });
  }

  render() {
    const { isShowing } = this.state;

    return (
      <React.Fragment>
        <Helmet key="helmet">
          <title>Home</title>
        </Helmet>
        <Carousel onClick={this.handleClick} auto={true}>
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
        <CityPicker
          show={isShowing}
          onOK={this.okPicker}
          onClose={this.closePicker}
        />
        <Link key="link" to="/about">
          THIS IS HOME HOME.
        </Link>
      </React.Fragment>
    );
  }
}

export { Home };
export default Home;
