import React, { PureComponent } from 'react';

import { observer, inject } from 'mobx-react';

import Room from '../components/room';

@observer
@inject( 'store' )
class Home extends PureComponent {
  constructor( props ) {
    super( props );
    this.store = this.props.store.homeStore;

    this.minus = this.store.minus;
    this.plus = this.store.plus;
  }

  componentWillMount() {
    console.log( 'home is going to mount.');
  }

  componentDidMount() {
    console.log( 'home is mounted.');
  }

  componentWillUnmount() {
    console.log( 'home is going to unmount.');
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
        <Room />
      </div>
    );
  }
}

export default Home;