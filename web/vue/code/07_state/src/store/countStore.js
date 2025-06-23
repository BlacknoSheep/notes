import { ref, computed } from "vue";
import { defineStore } from "pinia";

// 组合式 api 的方式创建一个countStore
export const useCountStore = defineStore("count", () => {
  // 定义状态
  const count = ref(10);

  // 定义计算属性
  const double = computed(() => count.value * 2);

  // 定义修改状态的方法
  function increment() {
    count.value++;
  }

  // 暴露出去
  return {
    count,
    double,
    increment,
  };
});
