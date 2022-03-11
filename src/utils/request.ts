/**
 * 封装 Axios 请求
 */
import axios from 'axios'
import qs from 'qs'
import {message} from '../utils'
import {addPending, removePending} from './CancelAxiosRequest'

const ENV_PRO: string = 'https://api.yuanki.cn/api';
// const ENV_DEV: string = 'http://127.0.0.1:3000/api';
const ENV_DEV: string = 'https://api.yuanki.cn/api';
const base: string = import.meta.env.PROD ? ENV_PRO : ENV_DEV

// 创建axios实例
const instance = axios.create({
  baseURL: base,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  removePending(config)
  addPending(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  message('error', '服务异常')
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  removePending(response)
  console.log(response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (axios.isCancel(error)) {
    message('error', '服务异常')
    console.log('repeated request: ' + error.message)
  } else {
    // handle error code
    console.error('request -> error', error)
    message('error', '服务异常')
  }
  return Promise.reject(error);
});
/**
 *@param {string} url 请求url
 *@param {string} method 请求方式
 *@param {object} params 请求参数
 *@param {string} contentType 参数格式
 */
export default async function request(url: string, method: string, params?: Object, contentType?: string) {
  let lang: string = localStorage.getItem('lang') === 'zh' ? 'zh_cn' : 'en_us';

  if (method === 'get') {
    const res = await instance.get(`${base}${url}`, {
      params: params,
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'application/x-www-form-urlencoded',
        lang: lang
      }
    });
    return res.data;
  }

  if (contentType === 'formData') {
    const res = await instance.post(`${base}${url}`, params, {
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'multipart/form-data',
        lang: lang
      }
    });
    return res.data;
  }

  if (contentType === 'form') {
    const res = await instance.post(`${base}${url}`, qs.stringify(params), {
      headers: {
        'apiMethod': 'ajax',
        'content-type': 'application/x-www-form-urlencoded',
        lang: lang
      }
    });
    return res.data;
  }

  const res = await instance.post(`${base}${url}`, params, {
    headers: {
      'apiMethod': 'ajax',
      'content-type': 'application/json;charset=UTF-8',
      lang: lang
    }
  });
  return res.data;
}
