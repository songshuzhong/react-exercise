/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date 2019/04/04
 *@desc 省市选择器
 */
import React from 'react';

import {locations} from './enum-location';

const defaultStyle = {
    width: '50%',
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderBottom: '.0243rem solid #e0e0e0',
    marginBottom: '.12rem',
    background: 'transparent',
    fontSize: '.34rem'
};

export class ProvincePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: locations['86'],
            citys: locations['110000'],
            selectCityKey: '110101',
            selectProvinceKey: '110000',
            selectProvince: '',
            selectCitys: ''
        };
    }

    handleSelectChanged(type, e) {
        const index = e.target.selectedIndex;
        const name = e.target.options[index].text;
        const key = e.target.options[index].value;

        if (type === 1) {
            this.setState({selectProvince: name, selectProvinceKey: key},
                this.props.getProvince(name));
        } else {
            this.setState({selectCity: name, selectCityKey: key},
                this.props.getCity(name));
        }
    }

    render() {
        let {style, className} = this.props;
        let {province, selectCityKey, selectProvinceKey} = this.state;
        let citys = locations[selectProvinceKey];

        return (
            <React.Fragment>
                <select
                    style={style || defaultStyle}
                    className={className}
                    value={selectProvinceKey}
                    onChange={this.handleSelectChanged.bind(this, 1)}>
                    {
                        Object.keys(province).map(p => <option key={p} value={p}>{province[p]}</option>)
                    }
                </select>
                <select
                    style={style || defaultStyle}
                    className={className}
                    value={selectCityKey}
                    onChange={this.handleSelectChanged.bind(this, 2)}>
                    {
                        Object.keys(citys).map(c => <option key={c} value={c}>{citys[c]}</option>)
                    }
                </select>
                <div className="area-picker-wrap">
                    <span className="area-picker-trigger" />
                    <i className="area" />
                </div>
            </React.Fragment>
        );
    }
}
