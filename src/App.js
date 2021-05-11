import React, { Component } from 'react'
import { Button } from 'antd'
import { Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
import './App.css'

class App extends Component{
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Admin}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    )
  }
}

export default App
