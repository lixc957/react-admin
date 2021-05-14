import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import { apiLogin } from '../../api/login'
import { setLocalStorage, getLocalStorage } from '../../utils'

import './login.less'
const Item = Form.Item // 不能写在import之前

class Login extends Component {
  handleSubmit = e => {
    // 表单提交
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 校验通过
        const { username, password } = values
        try {
          const res = await apiLogin({ username, password })
          message.success('登陆成功!')
          setLocalStorage('userInfo', res.data)
          this.props.history.replace('/')
        } catch (err) {
          message.error(err.msg)
        }
      }
    })

    // 得到 from 对象值
    /* const { getFieldsValue } = this.props.form
    const values = getFieldsValue()
    console.log(values) */
  }
  validatePwd = (rule, value, callback) => {
    // 自定义验证密码
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  }
  render() {
    const userInfo = getLocalStorage('userInfo')
    if (userInfo) return <Redirect to="/" />
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
              {getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ],
                // validateTrigger: 'onBlur',
                initialValue: 'admin'
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                  autoComplete="off"
                />
              )}
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
