import { defineAsyncComponent } from "vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
//import type { DefineComponent } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: defineAsyncComponent(() => import("../views/Login.vue")),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: defineAsyncComponent(() => import("../views/Home.vue")),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
