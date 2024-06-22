<template>
  <div class="layout">
    <el-container class="container">
      <el-header class="header">
        <div class="logo">Myblog</div>
        <div class="user-info">
          <span>欢迎回来</span>
          <el-dropdown trigger="click">
            <span class="nick-name">
              {{ userInfo.username }}
              <span class="iconfont icon-close"></span>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile"
                  >个人信息</el-dropdown-item
                >
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="left-aside">
          <div></div>
          <div class="menu-panel">
            <ul>
              <li v-for="(menu, index) in menuList">
                <span class="menu-title-p" @click="openClose(index)">
                  <span :class="['iconfont', menu.icon]"></span>
                  <span class="menu-title">{{ menu.title }}</span>
                  <span
                    :class="[
                      'iconfont',
                      'open-close',
                      menu.open ? 'icon-open' : 'icon-close',
                    ]"
                  ></span>
                </span>

                <ul class="sub-menu" v-show="menu.open">
                  <li v-for="subMenu in menu.children">
                    <router-link
                      :to="subMenu.path"
                      :class="[
                        'sub-menu-item',
                        activePath == subMenu.path ? 'active' : '',
                      ]"
                      >{{ subMenu.title }}</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, watch, onMounted } from "vue";
import Vuecookies from "vue-cookies";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const menuList = ref([
  {
    title: "博客",
    icon: "icon-Blog",
    open: true,
    children: [
      {
        title: "博客撰写",
        path: "/blog/list",
      },
      {
        title: "博客管理",
        path: "/blog/category",
        icon: "icon-category",
      },
    ],
  },

  {
    title: "设置",
    icon: "icon-setting",
    open: true,
    children: [
      {
        title: "个人信息",
        path: "/setting/profile",
      },
      {
        title: "博客成员",
        path: "/setting/user",
      },
    ],
  },
  /*{
    title: "回收站",
    icon: "icon-delete_light",
    open: true,
    children: [
      {
        title: "回收站",
        path: "/recycle/list",
      },
    ],
  },*/
]);
const openClose = (index) => {
  const open = menuList.value[index].open;
  menuList.value[index].open = !open;
};
const userInfo = ref({});
const init = () => {
  userInfo.value = Vuecookies.get("userInfo");
};
init();
const activePath = ref(null);
watch(
  route,
  (newVal, oldVal) => {
    activePath.value = newVal.path;
  },
  { immediate: true, deep: true }
);
const logout = () => {
  Vuecookies.remove("userInfo");
  router.push("/login");
};

const goToProfile = () => {
  router.push("/setting/profile");
};
</script>

<style lang="scss">
.layout {
  .header {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 30px;
    }
    .user-info {
      display: flex;
      align-items: center;
      .nick-name {
        cursor: pointer;
        color: pink;
        .iconfont {
          font-size: 14px;
        }
      }
    }
  }
  .container {
    padding-top: 10px;
    height: calc(100vh - 60px);
    background: #f5f5f5;
    .left-aside {
      padding: 0px 15px;
      width: 280px;
      .post-btn {
        background: green;
        color: yellow;
        height: 40px;
        width: 100%;
      }
      .menu-panel {
        margin-top: 5px;

        ul,
        li {
          padding: 0px;
          margin: 0px;
          list-style: none;
        }
        .menu-title-p {
          padding: 0px 5px;
          line-height: 45px;
          cursor: pointer;
          display: flex;
          .iconfont {
            font-size: 20px;
            color: BLUE;
          }
          .menu-title {
            flex: 1px;
            color: black;
            margin-left: 10px;
          }
          .open-close {
            width: 20px;
            font-size: 16px;
          }
        }
        .menu-title-p:hover {
          background: #ddd;
        }
        .sub-menu {
          padding-left: 25px;
          font-size: 14px;
          .sub-menu-item {
            padding: 0px 10px;
            display: block;
            line-height: 40px;
            cursor: pointer;
            text-decoration: none;
            color: rgb(88, 88, 88);
          }
          .active {
            background: #ddd;
            color: rgb(23, 120, 194);
          }
          .sub-menu-item:hover {
            background: #ddd;
            color: rgb(23, 120, 194);
          }
        }
      }
    }
    .right-main {
      background-color: #fff;
      .sub-menu-item {
        line-height: 30px;
      }
    }
  }
}
</style>
