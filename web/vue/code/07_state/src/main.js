import { createApp } from "vue";
import App from "./App.vue";

/*
  使用 Pinia
    1. 安装：npm install pinia
    2. 引入：import { createPinia } from "pinia";
    3. 创建 pinia 实例
    4. 将 pinia 设置为 vue 的插件
*/
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

// 将 pinia 设置为 vue 的插件
app.use(pinia);

app.mount("#app");
