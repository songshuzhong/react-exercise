import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout, Input, Alert } from 'antd';

import Singleton from '../../utils/socket/singleton';
import { getDataSource } from '../../utils/tools/dataSource';

class Wechat extends Component {
  constructor( props ) {
    super( props );
    this.socket = Singleton.getInstance();
    this.handleClick = this.handleClick.bind( this );
  }

  componentWillMount() {
    let { receiveMsg, userJoined, userLeft } = this.props;
    this.socket.on( 'new_msg', ( data ) => receiveMsg( data ) );
    this.socket.on( 'user_joined', ( user ) => userJoined( user ) );
    this.socket.on( 'user_left', ( user ) => userLeft( user ) );
  }

  handleClick( msg ) {
    if ( msg.trim().length > 0 ) {
      this.socket.emit( 'new_msg', msg );
    }
  }

  render() {
    let { messages, users } = this.props;
    return (
      <Layout style={ { height: '100%' } }>
        <Layout.Sider>
          <div style={ { height: '100%' } }>
            <ul>
              {
                users? users.map( ( user, index ) => <li key={ index }>{ user.username }</li> ): null
              }
            </ul>
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Header>
            <h2 style={ { textAlign: 'center', color: 'wheat' } }>欢迎来到聊天室</h2>
          </Layout.Header>
          <Layout.Content style={ { height: '100%' } }>
            <div style={ { height: '450px', overflow: 'scroll', padding: '20px', margin: '2px', border: '1px solid yellowgreen', borderRadius: '7px' } }>
              {
                messages.length > 0? messages.map( ( msg, index ) =>
                  <Alert key={ index } showIcon message={ msg.username? msg.username: 'sys' } description={ msg.text } type={ msg.type === 'sys_msg'? 'info': 'success' } />
                ): null
              }
            </div>
            <Input.Search placeholder="随便说点儿啥喽......" onSearch={ this.handleClick } enterButton="发送" />
          </Layout.Content>
          <Layout.Footer>
            <div style={ { textAlign: 'center' } }>
              <span style={ { lineHeight: '16px', paddingRight: '12px', marginRight: '11px', borderRight: '1px solid rgba(255, 255, 255, 0.55)' } }>
                <span>隐私权政策</span>
              </span>
              <span style={ { marginRight: '24px' } }>
                <span>权益保障承诺书</span>
              </span>
              <span style={ { marginRight: '12px' } }>ICP 证浙 B2-2-100257</span>
              <span style={ { marginRight: '12px' } }>Copyright © <span>大写的二</span></span>
            </div>
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    messages: state.record.messages,
    users: state.record.users
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    receiveMsg: ( data ) => { dispatch( { type: 'receive_msg', data } ) },
    userJoined: ( user ) => {
      dispatch( { type: 'user_joined_pending', user } );
      getDataSource( '/users/find/all', users => dispatch( { type: 'user_joined', users } ) );
      },
    userLeft: ( user ) => {
      dispatch( { type: 'user_left_pending', user } );
      getDataSource( { url: '/users/findByStatus', params: { body: JSON.stringify( { status: 1 } ) } }, users => dispatch( { type: 'user_left', users } ) );
      }
  };
};

Wechat.contextTypes = { router: PropTypes.object.isRequired };
export default connect( mapStateToProps, mapDispatchToProps )( Wechat );
