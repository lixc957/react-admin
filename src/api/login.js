import { axios } from './axios'

/*
 * 	登陆
 * username: 用户名 string
 * password: 密码 string
 */
export const apiLogin = ({ username, password }) => axios({
  url: '/login',
  method: 'post',
  data: { username, password }
})

/*
 * 添加用户
 */
 export const apiAddUser = data => axios({
  url: '/manage/user/add',
  method: 'post',
  data
})