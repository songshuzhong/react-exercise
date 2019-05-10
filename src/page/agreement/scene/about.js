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

import '../../../styles/about.css';

const About = props =>
  <React.Fragment>
        <Helmet key='helmet'>
            <title>About</title>
        </Helmet>
        <Link key='link' to='/app'>THIS IS ABOUT PAGE.</Link>
        <label>
            <input type='radio' name='type' id='adviceRadio1' value='1' hidden />
            <label htmlFor='adviceRadio1' className='advice' />
            <span className='radio-name'>问题</span>
        </label>
    </React.Fragment>;

export {About};
export default About;
