import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { formateDate, getLocalStorage, removeLocalStorage } from '../../utils'
import { Modal } from 'antd'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'
import './index.less'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    username: ''
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title 
    for (let index = 0; index < menuList.length; index++) {
      const item = menuList[index]
      if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
          break
        }      
      } else if (item.key === path) {
        title = item.title
        break
      }    
    }
    return title
  }

  getUserName = () => {
    const { username } = getLocalStorage('userInfo')
    this.setState({ username })
  }

  logout = () => {
    Modal.confirm({
      content: '确定退出吗?',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        removeLocalStorage('userInfo')
        this.props.history.replace('/login')
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.getTime()
    this.getUserName()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {this.state.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
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

export default withRouter(Header)
