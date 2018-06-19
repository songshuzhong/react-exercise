import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Index from '../components/home'
import About from '../components/about'
import Items from '../components/itemsList'
import Detail from '../components/detail'

const Main = () => (
  <Switch>
    <Route exact path="/" render={(props) => (<Index {...props}/>)}/>
    <Route path="/about" component={About}/>
    <Route path="/items" render={(props) => (<Items {...props}/>)}/>
    <Route exact path="/news/:id" render={(props) => (<Detail {...props}/>)}/>
    <Route render={() => <h1>找不到此页面</h1>}/>
  </Switch>
)

export default Main;