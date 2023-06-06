// 引入Vue
// import { createApp } from "vue"; // 直接引入的vue默认不支持通过template属性来设置模板
import { createApp } from "vue/dist/vue.esm-bundler.js";

// 创建一个根组件
const App = {
  data() {
    return {
      msg: "Hello World",
    };
  },
  template: "<h1>{{msg}}</h1>",
};

// 创建实例并挂载到页面
createApp(App).mount("#app"); // mount的返回值是根组件的实例（对象）
