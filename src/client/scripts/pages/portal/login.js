import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Layout, Row, Col, Form, Radio, Icon, Input, Button, notification } from 'antd';

import Singleton from '../../utils/socket/singleton';
import { getDataSource } from '../../utils/tools/dataSource';

const observer = new IntersectionObserver( ioes => {
  ioes.forEach( ioe => {
    let el = ioe.target;
    if ( !el.src ) {
      el.src = el.dataset.src;
    }
  } );
} );

class LoginForm extends PureComponent {
  constructor( props ) {
    super( props );
    this.socket = Singleton.getInstance();
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentDidMount() {
    let imgs = Array.from( document.getElementsByClassName( 'my-photo' ) );
    imgs.forEach( ( item ) => {
      observer.observe( item );
    } );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        getDataSource( { url: '/users/findByNameAndPasd', params: { body: JSON.stringify( user ) } }, res => {
          if ( res.users.length ) {
            notification.open( { message: '提示：', description: '登录成功，正在进入聊天室！',
              onClose: () => { this.props.history.push( '/wechat' ); this.socket.emit( 'user_joined', user ); } } );
          } else {
            notification.open( { message: '提示：', description: '抱歉，登录失败！请检查您的输入！' } );
          }
        } );
      }
    });
  };

  render() {
    const { getFieldProps, getFieldDecorator } = this.props.form;
    return (
      <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
        <div style={ { width: '100px', height: '100px', margin: '20px', backgroundColor: 'green', borderRadius: '100px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url('/img/default.jpg')` } } />
        <Form onSubmit={this.handleSubmit} className="login-form" style={ { width: '300px' } }>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Link to="/register">注册</Link>
            <Link to="/manage">跳转到About</Link>
          </Form.Item>
        </Form>
        <div className="container">
          <div className="img-area">
            <img className="my-photo" alt="loading" data-src="/img/default.jpg" />
          </div>
          <div className="img-area">
            <img className="my-photo" alt="loading" data-src="/img/default.jpg" />
          </div>
          <div className="img-area">
            <img className="my-photo" alt="loading" data-src="/img/default.jpg" />
          </div>
          <div className="img-area">
            <img className="my-photo" alt="loading" data-src="/img/default.jpg" />
          </div>
          <div className="img-area">
            <img className="my-photo" alt="loading" data-src="/img/default.jpg" />
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.contextTypes = { router: PropTypes.object.isRequired };

const Home = Form.create()( LoginForm );
export default Home;
