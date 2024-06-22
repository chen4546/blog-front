<template>
  <div>
    <h1>{{ blog.title }}</h1>
    <div v-html="blog.content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Vuecookies from "vue-cookies";

const userInfo = Vuecookies.get("userInfo");
const blog = ref({
  title: "",
  id: "",
  content: "",
});

const fetchBlog = async () => {
  try {
    const response = await axios.get("http://localhost:3030/title");
    blog.value = response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};

onMounted(() => {
  fetchBlog();
});
</script>
