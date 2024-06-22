<template>
  <div class="profile">
    <h1>当前用户信息</h1>

    <div v-if="user" class="user-info">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>昵称:</strong> {{ user.username }}</p>
      <p><strong>年龄:</strong> {{ user.age }}</p>
    </div>
    <div v-else class="no-user">
      <p>No user profile available.</p>
    </div>
  </div>
</template>

<script>
import Vuecookies from "vue-cookies";
const userInfo = Vuecookies.get("userInfo");
export default {
  name: "Profile",
  data() {
    return {
      user: userInfo,
    };
  },
  methods: {
    getProfile() {
      // 这里可以添加获取用户信息的逻辑
      console.log("Fetching user profile...");
    },
  },
};
</script>

<style scoped>
.profile {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.user-info {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-info p {
  margin: 10px 0;
}

.no-user {
  margin-top: 20px;
  color: #888;
}

.el-button {
  margin-top: 20px;
}
</style>
