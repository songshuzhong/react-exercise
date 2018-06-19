import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

export default class Header extends PureComponent {
  constructor( props ) {
    super( props );

    this.state = { current: this.props.pathname === '/'? '/home': this.props.pathname };
  }

  handleClick( e ) {
    if ( e.key !== this.state.current ) {
      this.setState( { current: e.key } );
    }
  }

  render() {
    return (
      <Menu onClick={ this.handleClick.bind( this ) } selectedKeys={ [ this.state.current ] } mode="horizontal">
        <Menu.Item key="/home">
          <Link to="/">
            <span>首页</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/news">
          <Link to="/news">
            <span>文章</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/about">
          <Link to="/about">
            <span>关于</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}