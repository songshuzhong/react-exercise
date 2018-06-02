import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Row, Col, Table } from 'antd';

import { getDataSource } from '../../utils/tools/dataSource';

class Report extends PureComponent {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    let columns = [
      { title: '编号', dataIndex: 'messageid', key: 'messageid', width: '20%' },
      { title: '类型', dataIndex: 'type', key: 'type', width: '20%' },
      { title: '内容', dataIndex: 'text', key: 'text', width: '20%' },
      { title: '作者', dataIndex: 'username', key: 'username', width: '20%' },
      { title: '时间', dataIndex: 'create_time', key: 'create_time', width: '20%' }
    ];

    return (
      <Row>
        <Col span={ 24 }>
          {
            this.props.messages? <Table columns={ columns } dataSource={ this.props.messages } />: null
          }
        </Col>
        <Link to="/manage">link to manage.</Link>
      </Row>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    messages: state.report.messages
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    fetchMessages: function() {
      dispatch( { type: 'getMessagesPending' } );
      getDataSource( '/messages/get', messages => dispatch( { type: 'getMessages', messages } ) );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Report );
