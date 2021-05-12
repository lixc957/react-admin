import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getLocalStorage } from '../../utils'

export default class Admin extends Component {
  render() {
    const userInfo = getLocalStorage('userInfo')
    if (!userInfo) return <Redirect to='/login' />
    return (
      <div>
        Admin
      </div>
    )
  }
}
