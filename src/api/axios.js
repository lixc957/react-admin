import originAxios from 'axios'
import { message } from 'antd'

export function axios(config) {
  const instance = originAxios.create({
    // baseURL: 'http://localhost:5000'
  })
  
  instance.interceptors.request.use(config => {
    return config
  },err => {
    return message.error(err.message)
  })
  
  instance.interceptors.response.use(res => {
    if (res.data.status === 0) {
      return res.data
    } else {
      return Promise.reject(res.data)
    }
  },err => {
    return message.error(err.message)
  })
  
  return instance(config)
}