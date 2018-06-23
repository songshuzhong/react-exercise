import React, { Component } from 'react';

class Room extends Component {
  componentWillMount() {
    console.log( 'room is going to mount.');
  }

  componentDidMount() {
    console.log( 'room is mounted.');
  }

  componentWillUnmount() {
    console.log( 'room is going to unmount.');
  }

  render() {
    return (
      <h1>this is room.</h1>
    );
  }
}

export default Room;