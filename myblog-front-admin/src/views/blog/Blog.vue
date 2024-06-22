<template>
  <div>
    <Editor v-model="blogData" @submit="handleSubmit" />
    <div v-html="blogData.content"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import axios from "axios";
import Vuecookies from "vue-cookies";

const userInfo = Vuecookies.get("userInfo");
const blogData = ref({
  id: userInfo.id,
  title: "",
  content: "",
});

const handleSubmit = (data) => {
  const Data = {
    title_id: "",
    id: userInfo.id,
    content: "",
  };
  Data.title_id = data.title;
  Data.content = data.content;
  console.log("Submitted Data:", Data);
  // 在这里处理提交的数据，例如发送到服务器
  axios.post("http://localhost:3030/title/upload", Data).then((response) => {
    console.log(response.data);
    return;
  });
};
</script>
