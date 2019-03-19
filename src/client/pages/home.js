import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';

import Thunder from '../../utils/thunderHk';

import '../styles/home.css';

@inject( 'store' )
@observer
class Home extends Component {
  constructor( props ) {
    super( props );

    this.store = this.props.store.homeStore;
    this.minus = this.store.minus;
    this.plus = this.store.plus;
  }

  componentDidMount() {
    let thunder = Thunder.getInstance();
    thunder.sendLog({
      cst: 2,
      tid: 10547,
      ct: 8,
      logInfo: 'haokan_web',
      logFrom: 'feed',
      logExtra: {
        st: 'video',
        t: new Date().getTime(),
        tab: 'haokan_web',
        entry: 'hk_pc'
      }
    });
  }

  minusHandle() {
    this.minus();
  }

  plusHandle() {
    this.plus();
  }

  render() {
    let { text, number } = this.store;

    return [
      <title key={1}>Home</title>,
      <div key={ 2 } style={{textAlign: 'center'}}>
        <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.minusHandle.bind( this ) }>-</span>
        <span>{ number }</span>
        <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.plusHandle.bind( this ) }>+</span>
      </div>,
      <Link key={ 3 } to="/about">THIS IS HOME { text }.</Link>
    ];
  }
}

export { Home };
export default Home;
