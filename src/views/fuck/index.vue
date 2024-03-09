<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import {message as showMessage} from '../../utils'
import {useGetText, useClickToggle} from './'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const {randomText, getText} = useGetText()
    const {isToggle, handleClick} = useClickToggle(getText)
    document.title = '沙雕一下！'

    onMounted(async () => {
      await getText()
      showMessage('info', '点击文字刷新哦～')
    })

    return {
      randomText,
      handleClick,
      isToggle,
    }
  }
})
</script>

<template>
  <div class="page">
    <p
      class="text animate__animated"
      :class="isToggle ? 'animate__flipInX' : ''"
      @click="handleClick()"
    >
      {{ randomText }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  background-color: #008c8c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;

  .text {
    color: #fff;
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
}
</style>
