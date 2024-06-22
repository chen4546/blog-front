<template>
  <div class="blog">
    <h1>博客管理</h1>
    <div v-if="myblogs && myblogs.length" class="blog-list">
      <div v-for="myblog in myblogs" :key="myblog.id" class="blog-info">
        <p><strong>作者id:</strong> {{ myblog.id }}</p>
        <p><strong>标题:</strong> {{ myblog.title_id }}</p>
        <p>
          <strong>内容:</strong>
          <span v-html="myblog.content"></span>
        </p>
      </div>
    </div>
    <div v-else class="no-user">
      <p>暂无博客信息。</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const myblogs = ref([]);
const getBlog = () => {
  axios
    .get("http://localhost:3030/title")
    .then((result) => {
      myblogs.value = result.data;
    })
    .catch((error) => {
      console.error("请求出错：", error);
      myblogs.value = [];
    });
};
onMounted(() => {
  getBlog();
});
</script>

<style lang="scss">
.blog {
  text-align: center;
  padding: 40px;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
}

h1 {
  color: #333;
  margin-bottom: 40px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.blog-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-info {
  margin-top: 20px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  p {
    margin: 10px 0;
    text-align: left;
  }
}

.no-user {
  margin-top: 20px;
  color: #888;
  font-size: 1.2em;
}
</style>
