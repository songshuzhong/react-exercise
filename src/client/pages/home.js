import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

    componentDidMount() {
        alert(0)
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  render() {
    return( [
      <Helmet key='helmet'>
        <title>Home</title>
      </Helmet>,
      <input value={this.state.value} onChange={this.handleChange}/>,
      <Link key='link' to="/about">THIS IS HOME HOME.</Link>
    ] );
  }
}

export { Home };
export default Home;
