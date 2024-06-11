<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录窗</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="formData.account"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="formData.password"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span> </template
          ></el-input>
        </el-form-item>
        <checkCode class="checkbox" ref="checkRef" />

        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe" :label="true"
            >记住我</el-checkbox
          >
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            style="width: 100%"
            size="large"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import checkCode from "../components/checkcode.vue";

const checkRef = ref(null);

const checkVerification = async () => {
  const isVerified = await checkRef.value.verifyCode();
  if (isVerified) {
    console.log("验证码验证通过");
    alert("true");
    // 执行验证通过后的逻辑
  } else {
    console.log("验证码验证失败");
    alert("false");
    // 执行验证失败后的逻辑
  }
};

const login = async () => {
  console.log("执行登录逻辑");
  formDataRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
  });
  await checkVerification();
  // 执行登录逻辑
};
//表单
const formData = reactive({});
const rules = {
  account: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};
const formDataRef = ref();
/*const login = () => {
  formDataRef.value.validate((valid) => {
    if (!vaild) {
      return;
    }
  })

};*/
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
