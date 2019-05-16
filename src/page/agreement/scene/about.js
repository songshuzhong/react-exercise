/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import React from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import {observer, inject} from 'mobx-react';

import '../../../styles/about.css';

@inject('store')
@observer
class About extends React.Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.minus = this.store.minus;
        this.plus = this.store.plus;
    }

    minusHandle() {
        this.minus();
    }

    plusHandle() {
        this.plus();
    }

    render() {
        let {number} = this.store;
        return (
            <React.Fragment>
                <Helmet key='helmet'>
                    <title>About</title>
                </Helmet>
                <Link key='link' to='/app'>THIS IS ABOUT PAGE.</Link>
                <label>
                    <input type='radio' name='type' id='adviceRadio1' value='1' hidden/>
                    <label htmlFor='adviceRadio1' className='advice'/>
                    <span className='radio-name'>问题</span>
                </label>
                <span style={{background: '#666', color: '#fff', padding: '5px'}}
                      onClick={this.minusHandle.bind(this)}>-</span>
                <span>{number}</span>
                <span style={{background: '#666', color: '#fff', padding: '5px'}}
                      onClick={this.plusHandle.bind(this)}>+</span>
            </React.Fragment>
        );
    }
}

export {About};
export default About;
