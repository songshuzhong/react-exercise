import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Spin } from 'antd';

import dataSource from '../../utils/dataSource';
import { isEmptyObject } from '../../utils/objectEmpty';
import Config from "../assets/db.config";

@inject( 'store' )
@observer
class Details extends Component {
  constructor( props ) {
    super( props );
    this.state = { json: {} };
    this.id = this.props.match.params.id;
    this.store = this.props.store.detailsStore;
  }

  componentWillMount() {
    let { emptyData, fetchRemoteData } = this.store;

    fetchRemoteData( this.id );
    emptyData();
  }

  createMarkup() {
    return { __html: this.store.details.body };
  }

  render() {
    let { details } = this.store;

    return (
      <div>
        {
          isEmptyObject( details )? <div className='loading'><Spin /></div>: <div dangerouslySetInnerHTML={ this.createMarkup() } />
        }
      </div>
    );
  }
}

export default Details;