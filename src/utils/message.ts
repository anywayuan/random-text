import {message} from 'ant-design-vue'

export default (type: string, msg: string, dur?:number): Function => {
  if (type === 'info') return message.info(msg, dur)
  if (type === 'success') return message.success(msg, dur)
  return message.error(msg)
}
