import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'
//import DevTools from 'mobx-react-devtools';

import Main from './../routers';

import Header from './common/header'
import Footer from './common/footer'

@withRouter @inject('store') @observer
class App extends Component {

  render() {
    return (
      <div className="main">
        <Header {...this.props.location}/>

        <Main/>

        <Footer/>
        {/* <DevTools/> */}
      </div>
    )
  }
}

export default App