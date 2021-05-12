import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { getLocalStorage } from '../../utils'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render() {
    const userInfo = getLocalStorage('userInfo')
    if (!userInfo) return <Redirect to="/login" />
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            111
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
