import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'
const { SubMenu } = Menu

class LeftNav extends Component {
  menuNodes = [] // 标签数组
  openKey = '' // 展开的菜单栏

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList)
  }
  /*
   * 根据menu的数据数组生成对应的标签数组
   * 使用map() + 递归调用
   */
  getMenuNodes_map = menuList => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </NavLink>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }

        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }
    })
  }
  /*
   * 根据menu的数据数组生成对应的标签数组
   * 使用reduce() + 递归调用
   */
  getMenuNodes_reduce = menuList => {
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </NavLink>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        )
      }
      return pre
    }, [])
  }

  render() {
    const { pathname } = this.props.location

    return (
      <div className="left-nav">
        <NavLink to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </NavLink>
        <Menu selectedKeys={[pathname]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
