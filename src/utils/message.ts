/**
 * 二次封装 message 全局提示
 */
import {message} from "ant-design-vue";

/**
 * @param {string} type 提示类型
 * @param {string} msg 提示内容
 * @param {number} dur 持续时间
 */
export default (type: string, msg: string, dur?: number): Function => {
  if (type === "info") return message.info(msg, dur);
  if (type === "success") return message.success(msg, dur);
  return message.error(msg);
};
