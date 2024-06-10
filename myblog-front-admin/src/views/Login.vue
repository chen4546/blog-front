<template>
  <div class="login-body">
    <div class="login-panel">
      <el-form :model="fromData">
        <el-form-item label="">
          <el-input placeholder="account" v-model="fromData.account" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="password" v-model="fromData.passwrd" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="checkcode" v-model="fromData.checkcode" />
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="fromData.remberMe" :label="true"
            >remberMe</el-checkbox
          >
        </el-form-item>
        <el-form-item label="">
          <el-button>login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const fromData = reactive({});
</script>
<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url("../assets/background.jpg");
}
.login-panel {
  width: 350px;
  //height: 150px;
  background: white;
}
</style>
