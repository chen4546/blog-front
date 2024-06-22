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
    redirect: "/blog/list",
    children: [
      {
        path: "/blog/list",
        name: "博客撰写",
        component: () => import("../views/blog/Blog.vue"),
      },
      {
        path: "blog/category",
        name: "博客管理",
        component: () => import("../views/blog/BlogCategory.vue"),
      },
      {
        path: "/setting/profile",
        name: "个人资料",
        component: () => import("../views/setting/Profile.vue"),
      },
      {
        path: "/setting/user",
        name: "博客成员",
        component: () => import("../views/setting/User.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userInfo = (Vuecookies as any).get("userInfo");
  if (!userInfo && to.path != "/login") {
    router.push("/login");
  }
  next();
});
export default router;
