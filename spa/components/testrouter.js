import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';

const Topic = ( { match } ) => (<h3>{ match.params.topicId }</h3>);

class TestRouter extends PureComponent {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
        <h2>second title</h2>
        <ul className="nav">
          <li><Link to={ `${ this.props.match.url }/rendering` }>rendering</Link></li>
          <li><Link to={ `${ this.props.match.url }/component` }>component</Link></li>
          <li><Link to={ `${ this.props.match.url }/prop-state` }>prop-state</Link></li>
        </ul>
        <Route path={ this.props.match.url } render={ () => <h3>Please Choose!</h3> } />
        <Route path={ `${ this.props.match.url }/:topicId` } component={ Topic } />
      </div>
    );
  }
}

export default TestRouter;