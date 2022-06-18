import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI";
import "./assets/reset.css";
import "./assets/style.css";
import "./assets/fonts.css";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
