import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import store from '../redux/store';

class Plan extends PureComponent {
  constructor( props ) {
    super(props);
    this.state = {};
  }

  handleShow() {
    let b = this.props.planlist.show;

    store.dispatch( { type: 'show', show: !b } )
  }

  handleDetails( id ) {
    this.props.history.push( `/details/${ id }` );
  }

  handleDelete( id ) {
    store.dispatch( { type: 'delete', id: id } );
  }

  render() {
    return (
      <div>
        <div className="plant">
          <h3>计划表</h3>
          <p onClick={ this.handleShow.bind( this ) }>添加计划</p>
        </div>
        <table>
          <thead>
          <tr>
            <td>title</td>
            <td>content</td>
          </tr>
          </thead>
          <tbody>
          {
            this.props.planlist.planlist.map(
              ( data, index ) => (
                <tr key={ index }>
                  <td onClick={ this.handleDetails.bind( this, data.id ) }>{ data.title }</td>
                  <td>{ data.content }</td>
                  <td onClick={ this.handleDelete.bind( this, data.id ) }>delete</td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    planlist: state.planlist
  };
};

export default connect( mapStateToProps )( Plan );