import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "/登录",
    //component:Login,
    component: () => import("../views/Login.vue"),
    //redirect: "/login",
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    //name: "Home",
    component: () => import("../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
