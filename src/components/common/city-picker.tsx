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


interface IProps {
    show?: boolean;
    onClose(): void;
    onOK({
             selectProvince,
             selectCity,
             selectArea,
             selectProvinceKey,
             selectCityKey,
             selectAreaKey
         }): any;
}
interface IState {
    areas?: any;
    cities?: any;
    provinces?: any;
    selectAreaKey?: any;
    selectCityKey?: any;
    selectProvinceKey?: any;
    selectProvince?: any;
    selectCity?: any;
    selectArea?: any;
}
export class CityPicker extends React.Component<IProps, IState> {
    startY: number = 0;
    topStart: number = 0;
    topEnd: number = 0;
    moveTarget: any = null;
    dy: number = 0;
    content: any = null;
    constructor(props) {
        super(props);
        this.state = {
            provinces: locations['86'],
            cities: locations['110000'],
            areas: locations['110100'],
            selectAreaKey: '110101',
            selectCityKey: '110101',
            selectProvinceKey: '110000',
            selectProvince: '北京市',
            selectCity: '北京市',
            selectArea: '东城区'
        };
        this.touchstartHandler = this.touchstartHandler.bind(this);
        this.touchmoveHandler = this.touchmoveHandler.bind(this);
        this.touchendHandeler = this.touchendHandeler.bind(this);
        this.handleOK = this.handleOK.bind(this);
    }
    componentDidMount() {
        this.content.addEventListener('touchstart', this.touchstartHandler);
        this.content.addEventListener('touchmove', this.touchmoveHandler);
        this.content.addEventListener('touchend', this.touchendHandeler);
    }
    touchstartHandler(e) {
        e.stopPropagation();
        if (e.target.className.includes('mask')) {
            this.moveTarget = e.target.nextSibling.nextSibling;
        } else {
            this.moveTarget = e.target.nextSibling;
        }
        this.startY = e.touches[0].pageY;
        this.topStart = this.moveTarget.style.transform
            .split(',')[1]
            .replace('px', '')
            .trim();
    }
    touchmoveHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        this.topEnd = e.touches[0].pageY - this.startY + Number(this.topStart);
        this.moveTarget.style.transform =
            'translate3d(0, ' + this.topEnd + 'px, 0)';
    }
    touchendHandeler(e) {
        e.stopPropagation();
        e.preventDefault();
        const sign = this.topEnd >= 0 ? 1 : -1;
        const index = Math.round(Math.abs(this.topEnd) / 40);
        const last = this.moveTarget.children.length;
        const dyCatch = last * 40;
        this.dy = index * 40;
        if (sign >= 0) {
            this.dy = 0;
            this.setTransition(sign);
            return;
        } else if (this.dy >= dyCatch) {
            this.dy = dyCatch - 40;
            this.setTransition(sign);
            return;
        }
        this.setTransition(sign);
        const target = this.moveTarget.children[index];
        const value = target.innerText;
        const key = target.getAttribute('data-key');
        const type = target.getAttribute('data-type');
        if (type === '0') {
            const cities = locations[key];
            const selectCityKey = Object.keys(cities)[0];
            const selectCity = locations[key][selectCityKey];
            const areas = locations[selectCityKey];
            const selectAreaKey = Object.keys(locations[selectCityKey])[0];
            const selectArea = locations[selectCityKey][selectAreaKey];
            document.getElementById('citiesId').style.transform =
                'translate3d(0, 0, 0)';
            document.getElementById('areasId').style.transform =
                'translate3d(0, 0, 0)';
            this.setState({
                cities,
                areas,
                selectProvinceKey: key,
                selectProvince: value,
                selectCityKey,
                selectCity,
                selectAreaKey,
                selectArea
            });
        } else if (type === '1') {
            const areas = locations[key];
            const selectAreaKey = Object.keys(locations[key])[0];
            const selectArea = locations[key][selectAreaKey];
            document.getElementById('areasId').style.transform =
                'translate3d(0, 0, 0)';
            this.setState({
                areas,
                selectCityKey: key,
                selectCity: value,
                selectAreaKey,
                selectArea
            });
        } else {
            this.setState({
                selectAreaKey: key,
                selectArea: value
            });
        }
    }
    handleOK() {
        const {
            selectProvince,
            selectCity,
            selectArea,
            selectProvinceKey,
            selectCityKey,
            selectAreaKey
        } = this.state;
        this.props.onOK({
            selectProvinceKey,
            selectProvince,
            selectCityKey,
            selectCity,
            selectAreaKey,
            selectArea
        });
    }
    setTransition(sign) {
        this.moveTarget.style.transition = '0.3s cubic-bezier(0,0,0.2,1.15)';
        this.moveTarget.style.transform =
            'translate3d(0, ' + sign * this.dy + 'px, 0)';
    }
    render() {
        const { show, onClose } = this.props;
        const { provinces, cities, areas } = this.state;
        return (
            <div
                className='hk-city-picker'
                style={{ display: show ? 'block' : 'none' }}
            >
                <div className='wrapper'>
                    <header className='header'>
                        <div onClick={onClose}>取消</div>
                        <div>省市区联动</div>
                        <div onClick={this.handleOK}>确定</div>
                    </header>
                    <main ref={ref => (this.content = ref)} className='content'>
                        <div className='box'>
                            <div className='mask' />
                            <div className='indicator' />
                            <div
                                className='items'
                                style={{ transform: 'translate3d(0, 0px, 0)' }}
                            >
                                {Object.keys(provinces).map(k => (
                                    <div data-type={0} data-key={k} key={k}>
                                        {provinces[k]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='box'>
                            <div className='mask' />
                            <div className='indicator' />
                            <div
                                id='citiesId'
                                className='items'
                                style={{ transform: 'translate3d(0, 0px, 0)' }}
                            >
                                {Object.keys(cities).map(k => (
                                    <div data-type={1} data-key={k} key={k}>
                                        {cities[k]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='box'>
                            <div className='mask' />
                            <div className='indicator' />
                            <div
                                id='areasId'
                                className='items'
                                style={{ transform: 'translate3d(0, 0px, 0)' }}
                            >
                                {Object.keys(areas).map(k => (
                                    <div data-type={2} data-key={k} key={k}>
                                        {areas[k]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
                <div className='masks' onClick={onClose} />
            </div>
        );
    }
}
