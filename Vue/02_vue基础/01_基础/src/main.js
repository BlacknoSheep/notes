import { createApp } from "vue";
import App from "./App.vue";

/*
  App.vue是根组件
    - createApp(App) 将根组件关联到应用上，并返回一个应用实例
    - app.mount("#app") 将应用挂载到页面上，返回一个组件实例
      - 组件实例是一个Proxy对象（代理对象）
*/
const app = createApp(App);
const vm = app.mount("#app");
// const app2 = createApp(App);  // 可以创建多个应用实例，但是一般只创建一个
// createApp(App).mount("#app");
// console.log(vm);

// 将vm设置为全局变量
window.vm = vm;
