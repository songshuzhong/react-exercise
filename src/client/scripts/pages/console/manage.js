import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col, Table, notification } from 'antd';

import { Provider } from '../../utils/appContext';
import { getDataSource } from '../../utils/tools/dataSource';

const Profiler = React.unstable_Profiler;

class About extends PureComponent {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let columns = [
      { title: '编号', dataIndex: 'userid', key: 'userid', width: '10%' },
      { title: '姓名', dataIndex: 'username', key: 'username', width: '10%' },
      { title: '性别', dataIndex: 'sex', key: 'sex', width: '10%' },
      { title: '邮箱', dataIndex: 'email', key: 'email', width: '10%' },
      { title: '电话', dataIndex: 'phone', key: 'phone', width: '10%' },
      { title: 'QQ', dataIndex: 'qq', key: 'qq', width: '10%' },
      { title: '微信', dataIndex: 'wechat', key: 'wechat', width: '10%' },
      { title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: '10%' },
      { title: '更新时间', dataIndex: 'update_time', key: 'update_time', width: '10%' },
      { title: 'action', dataIndex: 'action', key: 'action', width: '10%', render: ( record, user ) => (
        <span>
          <a onClick={ () => this.props.deleteUser( record, user ) }>Delete</a>
        </span>
        ),
      }
    ];

    return (
      <Profiler id='identifier' onRender={ ( id, phase, actualTime, baseTime ) => { console.log( id, phase, actualTime, baseTime ); } }>
      <Provider value={ { key: 'manage', value: 'this is manage.' } }>
      <Row>
        <Col span={ 24 }>
          {
            this.props.users? <Table columns={ columns } dataSource={ this.props.users } />: null
          }
        </Col>
        <Link to="/report">link to report.</Link><br/>
        <Link to="/versions">link to report.</Link>
      </Row>
      </Provider>
      </Profiler>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.user.users
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    fetchUsers: function() {
      dispatch( { type: 'getUsersPending' } );
      getDataSource( '/users/find/all', users => dispatch( { type: 'getUsers', users } ) );
    },
    deleteUser: function( record, user ) {
      dispatch( { type: 'deleteUsersPending' } );
      getDataSource( { url: '/users/delete', params: { body: JSON.stringify( user ) } }, user => {
        if ( user ) {
          this.fetchUsers();
          notification.open( { message: '提示：', description: '恭喜您，成功！' } );
        } else {
          notification.open( { message: '提示：', description: '抱歉，失败！' } );
          dispatch( { type: 'deleteUsersFailed' } )
        }
      } );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( About );
