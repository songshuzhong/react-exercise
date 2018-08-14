import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      dynamicAttributes: props.initInfo || [ { 'abc': 123 } ],
      currentTab: 1
    };

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleAddAttribute = this.handleAddAttribute.bind( this );
  }

  componentWillMount() {
    let { dynamicAttributes } = this.state;

    dynamicAttributes.forEach( ( attr ) => {
      let keys = Object.keys( attr );
      attr.key = keys[ 0 ];
      attr.value = attr[ keys[ 0 ] ];
    } );

    this.setState( { dynamicAttributes } );
  }

  handleAddAttribute() {
    let { dynamicAttributes } = this.state;
    dynamicAttributes.push( { key: '', value: '' } );

    this.setState( { dynamicAttributes } );
  }

  handleSubmit( e ) {
    let { dynamicAttributes } = this.state;
    let formData = new FormData( this.form );

    for ( let i = 0, length = ( this.form.length - 2 ) / 3; i < length; i++ ) {
      if ( formData.get( 'key' + i ) ) {
        dynamicAttributes[ i ][ formData.get( 'key' + i ) ] = formData.get( 'value' + i );
      } else {
        dynamicAttributes[ i ][ dynamicAttributes[ i ].key ] = dynamicAttributes[ i ].value;
      }
      delete dynamicAttributes[ i ].key;
      delete dynamicAttributes[ i ].value;
    }
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Homes</title>
        </Helmet>
        <form ref={ form => this.form = form }>
          {
            this.state.dynamicAttributes.map( ( attr, index ) => {
              return (
                <div key={ index }>
                  <input name={ "check" + index } type="checkbox" />
                  <input name={ "key" + index } placeholder={ attr.key } />
                  <input name={ "value" + index } placeholder={ attr.value } />
                </div>
              );
            } )
          }
          <button type="button" onClick={ this.handleAddAttribute }>add</button>
          <button onClick={ this.handleSubmit }>submit</button>
        </form>
      </div>
    );
  }
}

export { Home };
export default Home;