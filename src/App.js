import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
import './App.css'

class App extends Component{
  render () {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    )
  }
}

export default App
