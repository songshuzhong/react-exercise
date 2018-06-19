import { observable, action, computed, autorun } from 'mobx';

import Config from '../assets/db.config';
import { getDate } from '../../utils/getDate';

class NewsStore {
  @observable newsList;
  @observable newsDate;

  constructor() {
    this.newsList = [];
    this.newsDate = '';
  }

  @computed
  get total() {
    return this.newsList.length;
  }

  @action
  emptyData = () => {
    this.newsList = [];
  }

  defaultData = autorun( () => this.fetchRemoteData( getDate() ) );

  @action
  fetchRemoteData = ( time ) => {
    fetch( Config.YAHOO + Config.API + time + Config.YAHOO_SUFFIX )
      .then(
        action( 'fetchRes', res => {
          return res.json();
        } ) )
      .then(
        action( 'fetchSuccess', data => {
          this.items = data.query.results.json.stories;
          this.newsDate = data.query.results.json.date;
        } ) )
      .catch( action( 'fetchError', err => { console.log( err ); } ) )
  }


}

const newsStore = new NewsStore();
export default newsStore;