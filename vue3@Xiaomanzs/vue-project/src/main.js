import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import GlobalVue from "./components/GlobalVue.vue";
const app = createApp(App);
app.component("GlobalVue", GlobalVue);
app.mount("#app");
