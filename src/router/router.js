import { createRouter, createWebHistory } from "vue-router";
import Converter from "../views/Converter.vue";
import Portfolio from "../views/Portfolio.vue";

const routes = [
  {
    path: "/",
    component: Converter,
  },
  {
    path: "/portfolio",
    component: Portfolio,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory("/cryptocurrency-converter/"),
});

export default router;
