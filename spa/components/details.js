import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Details extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      data: props.planlist.planlist.filter( data => data.id == props.match.params.topicId )[ 0 ]
    };
  }

  render() {
    return (
      <div>
        <h3>{ `id: ${ this.state.data.id }` }</h3>
        <h3>{ `id: ${ this.state.data.title }` }</h3>
        <h3>{ `id: ${ this.state.data.content }` }</h3>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    planlist: state.planlist
  };
};

export default connect( mapStateToProps )( Details );

