import { defineStore } from "pinia";
import { request } from "../utils";

const useGlobalStore = defineStore("main", {
  state: () => {
    return {
      count: 10,
      name: "Anyway",
      list: [],
    };
  },
  getters: {
    // 函数接收一个可选参数state状态对象
    demo(state) {
      return state.count + 5;
    },
  },

  actions: {
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

        state.count += count;
        state.name = "PIGTT" + state.count;
      });
    },

    async getList() {
      try {
        const { data } = await request("/blog/list", "post");
        console.log(data);
        this.list = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export default useGlobalStore;
