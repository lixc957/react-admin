import React, { Component } from 'react'
import { formateDate, getLocalStorage } from '../../utils'
import './index.less'

export default class Header extends Component {
  state = {
    currentTime: formateDate(Date.now())
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

  UNSAFE_componentWillMount() {
    this.getTime()
  }

  render() {
    const { username } = getLocalStorage('userInfo')
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          {/* <LinkButton onClick={this.logout}>退出</LinkButton> */}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>&nbsp;
            {/* <img src={dayPictureUrl} alt="weather" /> */}
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
