import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { getLocalStorage } from '../../utils'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'
import NotFound from '../not-found/not-found'

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
            <Switch>
              <Redirect exact from='/' to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/order" component={Order}/>
              <Route component={NotFound}/>              
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
