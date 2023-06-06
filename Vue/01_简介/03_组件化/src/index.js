// 引入Vue
/*
  - 直接引入的vue默认不支持通过template属性来设置模板。
  - 使用单文件组件后，template会由打包工具编译，所以可以直接引入"vue"。
*/
import { createApp } from "vue";
// import { createApp } from "vue/dist/vue.esm-bundler.js";

// 引入根组件
import App from "./App.vue";

// 创建实例并挂载到页面
createApp(App).mount("#app"); // mount的返回值是根组件的实例（对象）
