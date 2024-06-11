<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">user-login</div>
      <el-form :model="fromData">
        <el-form-item label="">
          <el-input placeholder="账号" v-model="fromData.account" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="password" v-model="fromData.passwrd" />
        </el-form-item>
        <checkCode />

        <el-form-item label="">
          <el-checkbox v-model="fromData.remberMe" :label="true"
            >remberMe</el-checkbox
          >
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import checkCode from "../components/checkcode.vue";
const fromData = reactive({
  account: "",
  password: "",
  remberMe: false,
});
//const checkCodeUrl = "api/checkCode"; //验证码接口，先保留，期待后续实现
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
  background: rgba(255, 255, 255, 0.7); //半透明登录窗
  float: right;
  margin-right: 200px;
  padding: 20px;
  margin-top: 350px;
  border-radius: 5px; //登录窗圆角
  box-shadow: 2px 2px 10px #889588;
  .login-title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  /*  .check-code-panel {
    display: flex;
    .input-panel {
      flex: 1;
    }
  }*/
}
</style>
