import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 用于注册能够被应用内所有组件实例访问到的全局属性
// app.config.globalProperties.globalHello = "我是全局属性";

const vm = app.mount("#app");
