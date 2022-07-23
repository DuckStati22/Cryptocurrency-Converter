import { createRouter, createWebHashHistory } from "vue-router";
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
  history: createWebHashHistory(),
});

export default router;
