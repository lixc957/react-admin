import { axios } from './axios'
import jsonp from 'jsonp'

export function apiGetWeather(city) {
  return new Promise(resolve => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      // 如果成功了
      /* if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      } */
    })
  })
}

// 获取一级或某个二级分类列表
export function apiGetCategoryList(parentId) {
  return axios({
    url: '/manage/category/list',
    params: { parentId }
  })
}

// 添加分类
export function apiCategoryAdd({ parentId, categoryName }) {
  return axios({
    url: '/manage/category/add',
    method: 'post',
    data: { parentId, categoryName }
  })
}

// 更新分类
export function apiCategoryUpdate({ categoryId, categoryName }) {
  return axios({
    url: '/manage/category/update',
    method: 'post',
    data: { categoryId, categoryName }
  })
}