import {defineStore} from "pinia";

const useUserInfoStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  getters: {},
  actions: {
    updateUserInfo(data: any) {
      this.$patch(state => {
        state.userInfo = data
      })
    },
    resetState() {
      this.$reset()
    }
  }
})

export default useUserInfoStore
