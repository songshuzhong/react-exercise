import React from 'react';

class LifeCycle extends React.Component {
  constructor( props ) {
    super( props );
  }

/*  componentWillMount() {
    console.log( 'will mount' );
  }*/

  componentDidMount() {
    console.log( 'did mount' );
  }

  static getDerivedStateFromProps( props, state ) {
    console.log( props, state );
    return null;
  }

/*  componentWillReceiveProps( nextProps ) {
    console.log( nextProps );
  }*/

  shouldComponentUpdate( nextProps, nextState ) {
    console.log( nextProps, nextState );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log( prevProps, prevState );
  }

/*  componentWillUpdate( nextProps, nextState ) {
    console.log( nextProps, nextState );
  }*/

  componentDidUpdate() {
    console.log( 'did Update' );
  }

  componentWillUnmount() {
    console.log( 'will unmount' );
  }

  render() {
    return (
      <div>react life cycle.</div>
    );
  }

}

export { LifeCycle };
export default LifeCycle;