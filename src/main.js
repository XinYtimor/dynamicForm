import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
const store = createPinia();
const app = createApp(App);
app.use(store).mount("#app");
