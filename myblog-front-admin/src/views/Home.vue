<template>
  <body>
    <div class="container">
      <div class="item" @click="push"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
  <el-button @click="logout()" size="large" type="primary">logout</el-button>
  <el-button @click="learn()" size="large" type="primary">learn</el-button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    },
    learn() {
      this.$router.push("/learn");
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #23262d;
}
.container {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  transition: 0.5s;
  /*.button {
    background-color: green;
    //background: transparent; //透明按钮
    border: none;
    color: white;
    padding: 50% 50%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition: 0.5s;
  }*/
}
@for $i from 0 through 8 {
  $index: $i + 1;
  .item:nth-child(#{$index}) {
    background: hsl($i * 30, 100%, 60%);
  }
  .container:has(.item:nth-child(#{$index}):hover) {
    $r: floor(calc($i / 3 + 1));
    $c: $i % 3 + 1;
    $arr: 1fr 1fr 1fr;
    $row: set-nth(
      $list: $arr,
      $n: $r,
      $value: 2fr,
    );
    $col: set-nth(
      $list: $arr,
      $n: $c,
      $value: 2fr,
    );
    grid-template-rows: $row;
    grid-template-columns: $col;
  }
}

.button:hover {
  width: 100%;
  height: 100%;
  transition: 0.5s;
}
</style>
