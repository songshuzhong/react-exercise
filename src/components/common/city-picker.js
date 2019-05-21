/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date 2019/0424
 *@desc
 */
import React from "react";

import { locations } from "./enum-location";

import "../../styles/components/city-picker.less";

export class CityPicker extends React.Component {


  constructor(props)     {
    super(props);
    this.moveTarget = null;
    this.startY = 0;
    this.dy = 0;
    this.state = {
      provinces: locations["86"],
      cities: locations["110000"],
      selectCityKey: "110101",
      selectProvinceKey: "110000",
      selectProvince: "",
      selectCitys: ""
    };
    this.touchstartHandler = this.touchstartHandler.bind(this);
    this.touchmoveHandler = this.touchmoveHandler.bind(this);
    this.touchendHandeler = this.touchendHandeler.bind(this);
  }

  componentDidMount() {
    this.content.addEventListener("touchstart", this.touchstartHandler);
    this.content.addEventListener("touchmove", this.touchmoveHandler);
    this.content.addEventListener("touchend", this.touchendHandeler);
  }

  touchstartHandler(e) {
    this.startY = e.touches[0].pageY;
    this.moveTarget = e.target.nextSibling.nextSibling;
    e.stopPropagation();
  }

  touchmoveHandler(e) {
    this.dy = e.touches[0].pageY - this.startY;
    this.moveTarget.style.transform = "translate3d(0, " + this.dy + "px, 0)";
    e.stopPropagation();
    e.preventDefault();
  }

  touchendHandeler(e) {
    e.changedTouches[0].target.nextElementSibling.style.transform =
      "translate3d(0, " + this.dy + "px, 0)";
    e.stopPropagation();
  }

  render() {
    const city_picker = 1;
    const { show, onClose, onOK } = this.props;
    const { provinces, cities } = this.state;

    if (city_picker == 1) {
      console.log(1);
    } else {
      console.log(1);
    }

    return (
      <div
        className="hk-city-picker"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="wrapper">
          <header className="header">
            <div onClick={onClose}>取消</div>
            <div>省市区联动</div>
            <div onClick={onOK}>确定</div>
          </header>
          <main ref={ref => (this.content = ref)} className="content">
            <div className="box">
              <div className="mask" />
              <div className="indicator" />
              <div className="items">
                {Object.keys(provinces).map(k => (
                  <div key={k} className="item">
                    {provinces[k]}
                  </div>
                ))}
              </div>
            </div>
            <div className="box">
              <div className="mask" />
              <div className="indicator" />
              <div className="items">
                {Object.keys(cities).map(k => (
                  <div key={k} className="item">
                    {cities[k]}
                  </div>
                ))}
              </div>
            </div>
            <div className="box">
              <div className="mask" />
              <div className="indicator" />
              <div className="items">
                {Object.keys(provinces).map(k => (
                  <div key={k} className="item">
                    {provinces[k]}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        <div className="masks" onClick={onClose} />
      </div>
    );
  }
}
