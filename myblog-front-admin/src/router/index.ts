import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "/登录",
    //component:Login,
    component: () => import("../views/Login.vue"),
    //redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
