import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
//import type { DefineComponent } from "vue";
import Vuecookies from "vue-cookies";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  /*{
    path: "/",
    redirect: "/login",
  },*/
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/",
    name: "框架页",
    component: () => import("../views/Framework.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const loginInfo = (Vuecookies as any).get("loginInfo");
  if (!loginInfo && to.path != "/login") {
    router.push("/login");
  }
  next();
});
export default router;
