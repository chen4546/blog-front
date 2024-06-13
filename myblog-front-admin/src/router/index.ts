import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
  {
    path: "/learn",
    //name: "Home",
    component: () => import("../views/learn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
