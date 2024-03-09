/**
 * @description Request utils
 * @author Yuan Liang
 * @date 2022/3/2 00:00:00
 * @version 1.0.0
 */
import axios from "axios";
import qs from "qs";
import { message } from "../utils";
import { addPending, removePending } from "./CancelAxiosRequest";

/* 生产环境地址 */
const ENV_PRO: string = "/api/v1";
/* 开发环境地址 */
// const ENV_DEV: string = 'http://127.0.0.1:3000/api';
const ENV_DEV: string = "/api/v1";

/*
  import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
  import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
  vite环境变量文档：https://cn.vitejs.dev/guide/env-and-mode.html
*/
const base: string = import.meta.env.PROD ? ENV_PRO : ENV_DEV;

// 创建axios实例
const instance = axios.create({
  baseURL: base,
  timeout: 10000,
});

// axios 请求拦截器
instance.interceptors.request.use(
  function (config) {
    removePending(config);
    addPending(config);
    return config;
  },
  function (error) {
    message("error", "服务异常");
    return Promise.reject(error);
  }
);

// axios 响应拦截器
instance.interceptors.response.use(
  function (response) {
    removePending(response);
    const { data } = response;
    if (data.code === 200 || data.code === 201) {
      return response;
    }
    message("error", data.message);
    return Promise.reject(data);
  },
  function (error) {
    if (axios.isCancel(error)) {
      message("error", "服务异常");
      console.log("repeated request: " + error.message);
    } else {
      console.error("request -> error", error);
      message("error", "服务异常");
    }
    return Promise.reject(error);
  }
);
/**
 *@param {string} url 请求url
 *@param {string} method 请求方式
 *@param {object} params 请求参数
 *@param {string} contentType 参数格式
 */
export default async function request(
  url: string,
  method: string | Object,
  params?: Object,
  contentType?: string
) {
  let lang: string = localStorage.getItem("lang") === "zh" ? "zh_cn" : "en_us";

  // get request
  if (method === "get") {
    const res = await instance.get(url, {
      params: params,
      headers: {
        apiMethod: "ajax",
        "content-type": "application/x-www-form-urlencoded",
        lang: lang,
      },
    });
    return res;
  }

  // post request --> form-data
  if (contentType === "formData") {
    const res = await instance.post(url, params, {
      headers: {
        apiMethod: "ajax",
        "content-type": "multipart/form-data",
        lang: lang,
      },
    });
    return res;
  }

  // post request --> form
  if (contentType === "form") {
    const res = await instance.post(url, qs.stringify(params), {
      headers: {
        apiMethod: "ajax",
        "content-type": "application/x-www-form-urlencoded",
        lang: lang,
      },
    });
    return res;
  }

  // post request --> json
  const res = await instance.post(
    url,
    { ...params },
    {
      headers: {
        apiMethod: "ajax",
        "content-type": "application/json;charset=UTF-8",
        lang: lang,
      },
    }
  );
  return res.data;
}
