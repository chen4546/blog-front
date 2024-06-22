<template>
  <div class="profile">
    <h1>所有用户信息</h1>

    <div v-if="users && users.length" class="user-list">
      <div v-for="(user, index) in users" :key="user.id" class="user-info">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>昵称:</strong> {{ user.username }}</p>
      </div>
    </div>
    <div v-else class="no-user">
      <p>暂无用户信息。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

const fetchUsers = () => {
  axios
    .get("http://localhost:3030/login")
    .then((result) => {
      users.value = result.data; // 获取所有用户信息并赋值给users
    })
    .catch((error) => {
      console.error("请求出错：", error);
      users.value = []; // 如果请求出错设为空数组
    });
};

onMounted(() => {
  fetchUsers();
});
</script>

<style lang="scss">
.profile {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 80%;
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
