<template>
  <div class="blog">
    <h1>博客管理</h1>
    <div v-if="myblogs && myblogs.length" class="blog-list">
      <div
        v-for="myblog in myblogs"
        :key="myblog.title_id"
        class="blog-info"
        @click="selectBlog(myblog.title_id)"
      >
        <div v-if="selectedBlogId !== myblog.title_id">
          <p>
            <strong>作者id:</strong> {{ myblog.id }} <strong>标题:</strong>
            {{ myblog.title_id }}
          </p>
        </div>
        <div v-if="selectedBlogId === myblog.title_id" class="enlarged">
          <p>
            <strong>作者id:</strong> {{ myblog.id }} <strong>标题:</strong>
            {{ myblog.title_id }}
          </p>
          <p><strong>内容:</strong> <span v-html="myblog.content"></span></p>
        </div>
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
const selectedBlogId = ref(null);

const getBlog = () => {
  axios
    .get("http://8.130.27.131:3030/title")
    .then((result) => {
      myblogs.value = result.data;
    })
    .catch((error) => {
      console.error("请求出错：", error);
      myblogs.value = [];
    });
};

const selectBlog = (id) => {
  selectedBlogId.value = selectedBlogId.value === id ? null : id;
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
  cursor: pointer;

  p {
    margin: 10px 0;
    text-align: left;
  }
}

.enlarged {
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

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
