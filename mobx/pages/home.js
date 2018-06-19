import React, { PureComponent } from 'react';

import { observer, inject } from 'mobx-react';

@observer
@inject( 'store' )
class Home extends PureComponent {
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
    const { text, num } = this.store;
    return(
      <div>
        <div className='index-warp'><span>{ text }</span></div>
        <div style={{textAlign: 'center'}}>
          <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={this.minusHandle.bind(this)}>-</span>
          <span>{ num }</span>
          <span style={{background: '#666', color: '#fff', padding: '5px'}} onClick={this.plusHandle.bind(this)}>+</span>
        </div>
      </div>
    );
  }
}

export default Home;