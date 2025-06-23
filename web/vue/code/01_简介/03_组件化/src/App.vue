<!--
  单文件组件
    - 格式：.vue
    - vue文件本身并不能被浏览器解析，需要借助webpack等打包工具进行解析
        - 打包工具会直接将template转换为函数，无需在浏览器中编译
        - 由于是通过打包工具的插件编译的，所以可以使用大写标签
-->

<script>
import count_button from "./components/count_button.vue";

export default {
  data() {
    return {
      msg: "Hello Vue!",
      count: 0,
    };
  },

  components: {
    count_button,
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <count_button></count_button>
  <count_button></count_button>
</template>
