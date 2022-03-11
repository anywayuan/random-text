import {defineStore} from "pinia";
import {useGlobalStore} from './index'

const useUserInfoStore = defineStore('userStore', {
  state: () => {
    return {
      name: "梁予安",
      age: 18
    }
  },
  getters: {
    userInfo(state) {
      return `我的名字叫${state.name}，今年${state.age}岁。`
    }
  },
  actions: {
    updateUserInfo(age: number, name?: string) {
      let {name: nikeName} = useGlobalStore()
      this.$patch(state => {
        state.age = age
        state.name = name || nikeName
      })
    },
    resetState() {
      this.$reset()
    }
  }
})

export default useUserInfoStore
