import { defineStore } from "pinia";

/*
  创建store（选项式api）
    - 第一个参数为唯一id
    - 第二个参数为一个配置对象
*/
export const useCountStore = defineStore("count", {
  /*
    state 属性：是一个函数，将需要 pinia 维护的数据以对象的形式返回
  */
  state: () => ({
    count: 10,
  }),

  /*
    getters 属性：计算属性
  */
  getters: {
    double: (state) => state.count * 2,
  },

  /*
    actions 属性：方法
  */
  actions: {
    increment() {
      this.count++;
    },
  },
});
