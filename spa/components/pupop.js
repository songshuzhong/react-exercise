import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';

class Pupop extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      id: '',
      title: '1',
      content: '1'
    };
  }

  close() {
    let b = this.props.planlist.show;
    this.setState( { id: '', title: '', content: '' } );
    store.dispatch( { type: 'show', show: false } );
  }

  handleChange( str, e ) {
    this.setState( { id: Math.ceil( Math.random()*1000 ), [ str ]: e.target.value } );
  }

  confirm() {
    store.dispatch( { type: 'add', item: this.state } );
    this.setState( { id: '', title: '', content: '' } );
    this.close();
  }

  render() {
    return (
      <section className="popup" style={ this.props.planlist.show? {}: { display: 'none' } }>
        <div className="pbox">
          <span className="close" onClick={ this.close.bind( this ) }>X</span>
          <div>
            <h4>title</h4>
            <input onChange={ this.handleChange.bind( this, 'title' ) } value={ this.state.title } />
          </div>
          <div>
            <h4>content</h4>
            <textarea onChange={ this.handleChange.bind( this, 'content' ) } value={ this.state.content } rows={ 3 } />
          </div>
          <div className="pBtn">
            <span onChange={ this.close.bind( this ) }>cancel</span>
            <span onChange={ this.confirm.bind( this )}>ensure</span>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    planlist: state.planlist
  };
};

export default connect( mapStateToProps )( Pupop );