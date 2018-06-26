import React, { Component } from 'react';
import dataSource from "../../../../../utils/dataSource";
import Config from "../../../../../mobx/assets/db.config";

class AbortFetchTest extends Component {
  constructor( props ) {
    super( props );
    this.state = { json: {} };
  }

  componentDidMount() {
    setTimeout( () => {
        this.fetchHandler = dataSource( fetch( Config.YAHOO + Config.NEWS + this.id + Config.YAHOO_SUFFIX ) );

        this.p = this.fetchHandler();
        this.p.then( res => { return res.json() } )
          .then( data => { this.setState( { json: data.query.results.json } ); } )
          .catch( e => console.log( e, 'is canceled.............' ) );
      },
      5000 )
  }

  componentWillUnmount() {
    this.p.cancel();
  }

  render() {
    return (
      <div>{ this.state.json.toString() }</div>
    );
  }
}

export { AbortFetchTest };
export default AbortFetchTest;