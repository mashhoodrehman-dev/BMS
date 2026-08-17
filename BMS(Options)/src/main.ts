import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.ts";
import router from "./router/index.ts";

createApp(App).use(router).use(store).mount("#app");
