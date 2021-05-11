import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import './login.less'
const Item = Form.Item // 不能写在import之前

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const { getFieldsValue } = this.props.form
    const values = getFieldsValue()
    console.log(values);
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          <img src={require('../../assets/images/logo.png')} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username')(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }             
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password')(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    autoComplete="off"
                  />
                )
              }            
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(Login)
