<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useGlobalStore } from "../../store";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    let show = ref<boolean>(true);

    onMounted(() => {});

    const globalStore = useGlobalStore();

    const countHandleClick = () => {
      // 方式一：直接修改state中的数据
      /* globalStore.count++; */

      // 方式二：如果需要修改多个数据，建议使用$patch批量更新
      /* globalStore.$patch({
        count: globalStore.count+1,
        name: 'Yuan'
      }); */

      // 方式三：$patch一个函数,更好的批量更新方式
      /* globalStore.$patch((state) => {
        state.count++;
        state.name = "PIGTT";
      }); */

      // 方式四：逻辑比较多的时候可以封装到action中
      globalStore.changeState(10);
    };

    return {
      show,
      countHandleClick,
      globalStore,
    };
  },
});
</script>

<template>
  <div class="page-container">
    <a-button type="primary" @click="show = !show">切换</a-button>
    <a-button type="primary" ghost danger href="/user">to user</a-button>

    <transition>
      <div v-if="show" class="box animate__animated">
        {{ globalStore.name }}
      </div>
    </transition>
    <h1 @click="countHandleClick">{{ globalStore.count }}</h1>
    <h2>{{ globalStore.demo }}</h2>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: 100vw;
  height: 100vh;

  .box {
    font-size: 28px;
    font-weight: 500;
    color: #008c8c;
    width: 110px;
  }

  .v-enter-active {
    animation-name: zoomInDown;
  }

  .v-leave-active {
    animation-name: zoomOutUp;
  }
}
</style>
