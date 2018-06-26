import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Row, Col, Spin, Button, DatePicker } from 'antd';

import { subString, timeClear } from '../../utils/getDate'

@inject( 'store' )
@observer
class News extends Component {
  constructor( props ) {
    super( props );
    this.store = this.props.store.newsStore;
  }

  handleClick( value, dataString ) {
    const { emptyData, fetchRemoteData } = this.store;

    emptyData();
    fetchRemoteData( timeClear( dataString ) );
  }

  render() {
    const { newsList, newsDate, total, emptyData } = this.store;
    return(
      <div className='items-warp'>
        <div className='bar clearfix'>
          <DatePicker onChange={ this.handleClick.bind( this ) } />
          <Button onClick={() => emptyData()}>清除数据</Button>
        </div>
        <div className="main">
          <div className="gutter-example">
            { total > 0
              ? <Row gutter={16}>
                { newsList.map( ( e, index ) => <Col className="gutter-row" span={ 6 } key={ index }>
                  <Link className="item" to={ 'details/' + e.id }>
                    <img src={ e.images } role="presentation"/>
                    <p>{ e.title }</p>
                    <sub>{ subString( newsDate ) }</sub>
                  </Link>
                </Col> ) }
              </Row>
              : <div className="loading">
                <Spin size="large"/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default News;