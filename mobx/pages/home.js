import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

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
    const { text, number } = this.store;
    if ( number === 5 ) {
      throw new Error( 'the number is 5 in home.' );
    }
    return(
      <div>
        <div className='index-warp'><span>{ text }</span></div>
        <div style={{textAlign: 'center'}}>
          <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.minusHandle.bind( this ) }>-</span>
          <span>{ number }</span>
          <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={ this.plusHandle.bind( this ) }>+</span>
        </div>
      </div>
    );
  }
}

export default Home;