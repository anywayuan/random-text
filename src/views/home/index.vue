<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useMainStore } from "../../store";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    let show = ref<boolean>(true);

    onMounted(() => {
    });

    const mainStore = useMainStore();

    const countHandleClick = () => {
      // 方式一：直接修改state中的数据
      /* mainStore.count++; */

      // 方式二：如果需要修改多个数据，建议使用$patch批量更新
      /* mainStore.$patch({
        count: mainStore.count+1,
        name: 'Yuan'
      }); */

      // 方式三：$patch一个函数,更好的批量更新方式
      /* mainStore.$patch((state) => {
        state.count++;
        state.name = "PIGTT";
      }); */

      // 方式四：逻辑比较多的时候可以封装到action中
      mainStore.changeState(10);
    };

    return {
      show,
      countHandleClick,
      mainStore,
    };
  },
});
</script>

<template>
  <!--  <Todo msg="待办事项"/>-->
  <div class="page-container">
    <a-button type="primary" @click="show = !show">切换</a-button>
    <transition>
      <div v-if="show" class="box animate__animated">{{ mainStore.name }}</div>
    </transition>
    <h1 @click="countHandleClick">{{ mainStore.count }}</h1>
    <h2>{{ mainStore.demo }}</h2>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: 100vw;
  height: 100vh;

  .box {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
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
