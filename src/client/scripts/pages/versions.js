import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to={ '/16_4/event' }>/16-4/event</Link></li>
          <li><Link to={ '/16_4/life/cycle' }>/16-4/lifeCycle</Link></li>
          <li><Link to={ '/16_4/life/abortFetch' }>/16-4/abortFetch</Link></li>
          { this.props.children }
        </ul>
      </div>
    );
  }
}

export { Home };
export default Home;