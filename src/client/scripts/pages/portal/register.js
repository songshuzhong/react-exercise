import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Row, Col, Form, Radio, Icon, Input, Button, notification } from 'antd';

import Singleton from '../../utils/socket/singleton';
import { getDataSource } from '../../utils/tools/dataSource';

class Register extends PureComponent {
  constructor( props ) {
    super( props );
    this.socket = Singleton.getInstance();
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        getDataSource( { url: '/users/add', params: { body: JSON.stringify( user ) } }, res => {
          if ( res ) {
            notification.open( { message: '提示：', description: '恭喜您，注册成功，正在进入聊天室！',
              onClose: () => { this.props.history.push( '/wechat' ); this.socket.emit( 'user_joined', user ); } } );
          } else {
            notification.open( { message: '提示：', description: '抱歉，注册失败！' } );
          }
        } );
      }
    });
  };

  render() {
    const { getFieldProps, getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={12} offset={6}>
          <Form onSubmit={this.handleSubmit} className="login-form">
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
{/*            <Form.Item label="您的性别">
              <Radio.Group {...getFieldProps('sex', { initialValue: 0 })}>
                <Radio value={ 1 }>男的</Radio>
                <Radio value={ 0 }>女的</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('qq', {
                rules: [{ required: true, message: 'Please input your qq!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="qq" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('wechat', {
                rules: [{ required: true, message: 'Please input your wechat!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="wechat" />
              )}
            </Form.Item>*/}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
              <Link to="/manage">跳转到About</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

Register.contextTypes = { router: PropTypes.object.isRequired };

const Home = Form.create()( Register );
export default Home;
