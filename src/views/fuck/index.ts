import {message, request} from '../../utils'
import {Ref, ref} from 'vue'

/**
 * @function useGetText 获取随机文本相关逻辑
 * @return {string} randomText 请求到到随机文本
 * @return {function} getText 获取文本的请求方法
 * */
interface useGetText {
  randomText: Ref<string>,
  getText: Function
}

const useGetText = (): useGetText => {
  let randomText = ref<string>("")

  const getText = async (): Promise<void> => {
    try {
      const {data} = await request('/random/text', 'get')
      randomText.value = data.text
    } catch (e) {
      console.error(e)
    }
  }

  return {
    randomText,
    getText
  }
}

/**
 * @function useClickToggle 点击切换相关逻辑
 * @return {boolean} randomText 动画切换
 * @return {function} handleClick 点击事件
 * */
interface useClickToggle {
  isToggle: Ref<boolean>,
  handleClick: Function
}

const useClickToggle = (getText: Function): useClickToggle => {
  let isToggle = ref<boolean>(true)
  let timer = setTimeout(() => {
    isToggle.value = false
  }, 1000)

  const handleClick = async (): Promise<void> => {
    clearTimeout(timer)
    await getText()
    isToggle.value = true
    timer = setTimeout(() => {
      isToggle.value = false
    }, 1000)
  }

  return {
    isToggle,
    handleClick
  }
}

export {
  useGetText,
  useClickToggle
}
