/**
 * 中断所有重复请求，只发送距离最近一次的请求。
 */
import axios, {AxiosRequestConfig} from 'axios'
import qs from 'qs'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()

/**
 * @function addPending 添加请求
 * @param {Object} config
 */
export const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    // 如果 pending 中不存在当前请求，则添加进去
    if (!pending.has(url)) {
      pending.set(url, cancel)
    }
  })
}
/**
 * @function removePending 移除请求
 * @param {Object} config
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * @function clearPending 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
