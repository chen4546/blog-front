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
            show-password
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
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import checkCode from "../components/checkcode.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
//import { router } from "../router/index.ts";

const checkRef = ref(null);
const router = useRouter();

const checkVerification = async () => {
  const isVerified = await checkRef.value.verifyCode();
  if (isVerified) {
    console.log("验证码验证通过");
    //alert("true");
    // 执行验证通过后的逻辑
  } else {
    console.log("验证码验证失败");
    ElMessage.error("验证码错误，请重试！");
    // 执行验证失败后的逻辑
  }
};

const login = async () => {
  formDataRef.value.validate((valid) => {
    if (!valid) {
      console.log("表单数据验证失败");
      //ElMessage.error("表单数据验证失败，请检查输入");
      return;
    }
  });
  const verified = await checkVerification();

  // 执行登录逻辑

  //const url = "http://localhost:3030/login";
  const userData = {
    account: formData.account,
    password: formData.password,
  };
  console.log(userData.account);
  console.log();
  axios({
    url: "http://localhost:3030/login",
    userData: formDataRef.value,
  }).then((result) => {
    console.log(result.data[1].id);
    if (
      result.data[1].id === userData.account &&
      result.data[1].password === userData.password
    ) {
      // 跳转到home页面
      console.log("11111");
      router.push("/home");
      return;
    } else {
      // 账号或密码不匹配的逻辑
      // 显示错误信息或执行其他操作
      console.log("000000");
      ElMessage.error("账号或密码不匹配");
      return;
    }
  });
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
/*
/*试验代码===>*/
/*
var i = 0;

function displayData() {
  axios({
    url: "http://localhost:3030/login",
  })
    .then((result) => {
      console.log(result);
      if (result.data && result.data.length > 0) {
        var id = document.querySelector("#id");
        if (id) {
          id.value = result.data[i].id;
        } else {
          console.error('Element with id "id" not found');
        }

        var username = document.querySelector("#usm");
        if (username) {
          username.value = result.data[i].username;
        } else {
          console.error('Element with id "usm" not found');
        }

        var password = document.querySelector("#psw");
        if (password) {
          password.value = result.data[i].password;
        } else {
          console.error('Element with id "psw" not found');
        }

        var age = document.querySelector("#age");
        if (age) {
          age.value = result.data[i].age;
        } else {
          console.error('Element with id "age" not found');
        }
      } else {
        console.error("Data is empty or invalid");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
}

displayData();

function ln() {
  i++;
  displayData();
}

onMounted(() => {
  document.getElementById("lnButton").addEventListener("click", ln);
});*/
// <==试验代码
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
.ccc {
  width: 350px;
  //height: 150px;
  background: rgba(255, 255, 255, 0.7); //半透明登录窗
  float: left;
  margin-right: 200px;
  padding: 20px;
  margin-top: 350px;
  border-radius: 5px; //登录窗圆角
  box-shadow: 2px 2px 10px #889588;
}
</style>
