<script lang="ts">
import {defineComponent, ref, Ref, onMounted, toRefs} from "vue";
import {useUserInfoStore, useGlobalStore} from "../../store";
import {request} from '../../utils'

interface useGetUserInfo {
  text: Ref<string>;
  getUserInfo: Function,
  getBlog: Function
}

const useGetUserInfo = (): useGetUserInfo => {
  let text = ref<string>("")
  const getUserInfo = async (): Promise<void> => {
    try {
      const {data} = await request("/random/text", "get");
      text.value = data.text
    } catch (e) {
      console.error(e);
    }
  }
  const getBlog = async (): Promise<void> => {
    try {
      const res = await request('/blog/detail', "get", {id: 9})
      console.log(res)
    } catch (e) {
      console.error(e);
    }
  }
  return {
    text,
    getUserInfo,
    getBlog
  }
}

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const userInfoStore = useUserInfoStore()
    const {name} = useGlobalStore()

    const {text, getUserInfo, getBlog} = useGetUserInfo()

    const handleClickUpdate = () => {
      userInfoStore.updateUserInfo(20, "梁洪亮")
    }
    const handleClickReset = () => {
      userInfoStore.resetState()
    }

    onMounted(() => {
    })
    return {
      userInfoStore,
      handleClickUpdate,
      handleClickReset,
      name,
      text,
      getUserInfo,
      getBlog
    };
  },
});
</script>

<template>
  <div class="page-main">
    <div class="action">
      <a-button type="primary" danger @click="handleClickUpdate">Click update</a-button>
      <a-button type="primary" ghost danger @click="handleClickReset">Click reset</a-button>
      <a-button type="primary" ghost danger @click="getUserInfo">Request</a-button>
      <a-button type="primary" ghost danger @click="getBlog">Blog</a-button>
      <a-button type="primary" ghost danger href="/home">to home</a-button>
    </div>
    <p>{{ userInfoStore.name }} -- {{ name }}</p>
    <p>{{ userInfoStore.age }}</p>
    <p>{{ userInfoStore.userInfo }}</p>
    <p>{{ text || "暂无" }}</p>
  </div>
</template>

<style scoped lang="scss">
.page-main {
  text-align: center;

  .action {
    .ant-btn {
      margin-right: 8px;
    }
  }
}
</style>
