import axios from 'axios'
import qs from 'qs'
import {message} from '../utils'

let ENV_PRO: string = 'https://api.yuanki.cn/api';
// let ENV_DEV: string = 'http://127.0.0.1:3000/api';
let ENV_DEV: string = 'https://api.yuanki.cn/api';

let base: string = import.meta.env.PROD ? ENV_PRO : ENV_DEV

const instance = axios.create({
  baseURL: base,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  message('error', '服务异常')
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.error('request -> error', error)
  message('error', '服务异常')
  return Promise.reject(error);
});

export default function request(url: string, method: string, params?: Object, contentType?: string) {
  let lang = localStorage.getItem('lang') === 'zh' ? 'zh_cn' : 'en_us';

  if (method === 'get') {
    return instance.get(`${base}${url}`, {
      params: params,
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'application/x-www-form-urlencoded',
        lang: lang
      }
    }).then(res => res.data);
  }

  if (contentType === 'formData') {
    return instance.post(`${base}${url}`, params, {
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'multipart/form-data',
        lang: lang
      }
    }).then(res => res.data);
  }

  if (contentType === 'form') {
    return instance.post(`${base}${url}`, qs.stringify(params), {
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'application/x-www-form-urlencoded',
        lang: lang
      }
    }).then(res => res.data);
  }

  return instance.post(`${base}${url}`, params, {
    headers: {
      'apiMethod': 'ajax',
      'content-type': 'application/json;charset=UTF-8',
      lang: lang
    }
  }).then(res => res.data);
}
