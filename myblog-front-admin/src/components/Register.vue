<template>
  <div class="container">
    <h2 class="title">注册用户</h2>
    <el-form :model="newuser">
      <el-form-item>
        <el-input v-model="newuser.id" placeholder="请输入账号">
          <template #prefix>
            <span class="iconfont icon-account"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="newuser.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="newuser.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newuser.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertData">注册</el-button>
      </el-form-item>
      <el-link type="primary" @click="gotoLogin" style="margin-left: 100px"
        >已有账号？点此登录</el-link
      >
    </el-form>
  </div>
</template>

<script>
import { ElButton, ElInput, ElMessage, ElForm, ElFormItem } from "element-plus";
import axios from "axios";

export default {
  components: {
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
  },
  data() {
    return {
      newuser: {
        id: "",
        username: "",
        password: "",
        age: "",
      },
    };
  },
  methods: {
    insertData() {
      axios({
        method: "GET",
        url: "http://8.130.27.131:3030/login",
      }).then((result) => {
        if (this.newuser.id === "" || this.newuser.password === "") {
          ElMessage.error("账号或密码不能为空");
          return;
        }
        const users = result.data;

        let ishave = false;

        for (let user of users) {
          if (user.id === this.newuser.id) {
            ishave = true;
            break;
          }
        }
        if (!ishave) {
          axios
            .post("http://8.130.27.131:3030/login/user", this.newuser) // 发送POST请求到后端接口
            .then((response) => {
              // 处理响应数据
              console.log(response.data);
              ElMessage.success("注册成功");
              setTimeout(() => {
                location.reload(); //刷新页面
              }, 100);

              return;
            })
            .catch((error) => {
              // 处理错误
              console.error(error);
              ElMessage.error("插入数据失败");
            });
        } else {
          ElMessage.error("账号已存在，请重新输入");
        }
      });
    },
    gotoLogin() {
      setTimeout(() => {
        location.reload(); //刷新页面
      }, 100);
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 350px;
  background: rgba(255, 255, 255, 0.7); //半透明登录窗
  float: right;
  margin-right: 200px;
  padding: 20px;
  margin-top: 350px;
  border-radius: 5px; //登录窗圆角
  box-shadow: 2px 2px 10px #889588;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-button {
  width: 100%;
}
</style>
