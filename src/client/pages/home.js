import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';

import { Tabs } from 'element-react';

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

  minusHandle() {
    this.minus();
  }

  plusHandle() {
    this.plus();
  }

  render() {
    let { text, number } = this.store;

    return(
      <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
        <Tabs.Pane label="用户管理" name="1">
          <title key={1}>Home</title>,
          <div key={ 2 } style={{textAlign: 'center'}}>
            <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.minusHandle.bind( this ) }>-</span>
            <span>{ number }</span>
            <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.plusHandle.bind( this ) }>+</span>
          </div>,
          <Link key={ 3 } to="/about">THIS IS HOME { text }.</Link>
        </Tabs.Pane>
        <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
        <Tabs.Pane label="角色管理" name="3">角色管理</Tabs.Pane>
        <Tabs.Pane label="定时补偿任务" name="4">定时补偿任务</Tabs.Pane>
      </Tabs>
    );
  }
}

export { Home };
export default Home;
