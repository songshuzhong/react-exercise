import { observable, action } from 'mobx';

import Config from '../assets/db.config';

class DetailsStore {
  @observable details;

  constructor() {
    this.details = {};
  }

  @action
  emptyData = () => {
    this.details = {};
  };

  @action
  fetchRemoteData = ( id ) => {
    fetch( Config.YAHOO + Config.NEWS + id + Config.YAHOO_SUFFIX )
      .then( action( 'fetchRes', res => { return res.json() } ) )
      .then( action( 'fetchSuccess', data => { this.details = data.query.results.json; } ) )
      .then( action( 'fetchError', error => { console.log( error.toString() ) } ) );
  }
}

const detailsStore = new DetailsStore();
export default detailsStore;