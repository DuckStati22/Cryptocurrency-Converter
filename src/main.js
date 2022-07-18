import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI";
import router from "./router/router";
import "./assets/reset.css";
import "./assets/style.css";
import "./assets/fonts.css";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).mount("#app");
