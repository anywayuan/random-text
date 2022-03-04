import { defineStore } from "pinia";

export const useGlobalStore = defineStore("main", {
  /**
   * 储存全局状态
   * 1. state必须是函数：为了在服务端渲染的时候避免交叉请求导致数据状态污染。
   * 2. 必须是箭头函数：为了更好的TS类型推断。
   */
  state: () => {
    return {
      count: 10,
      name: "Anyway",
    };
  },

  // 用来封装计算属性，具有缓存功能
  getters: {
    // 函数接收一个可选参数state状态对象
    demo(state) {
      return state.count + 5;
    },

    // 如果在getters中使用了this 则必须手动指定返回值的类型，否则ts类型推导不出来。
    /*
    demo(){
     return this.count + 10
    }
    */
  },

  actions: {
    /* action中方法不能使用箭头函数来定义 */
    changeState(count: number) {
      // 1.
      // this.count += count;
      // this.name = "PIGTT";

      // 2.
      // action中也可以是使用$patch批量更新数据
      // this.$patch({});

      // 3.
      this.$patch((state) => {
        // state：数据更新后的上次数据
        console.log(state.name);

        this.count += count;
        this.name = "PIGTT";
      });
    },
  },
});
