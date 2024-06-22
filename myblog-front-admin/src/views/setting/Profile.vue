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

<script setup>
import { ref, onMounted } from "vue";
import VueCookies from "vue-cookies";

const user = ref(null);

const getProfile = () => {
  user.value = VueCookies.get("userInfo");
};

// 可以在组件挂载时获取用户信息
onMounted(() => {
  getProfile();
});
</script>

<style scoped lang="scss">
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
