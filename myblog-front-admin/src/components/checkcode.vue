<template>
  <div class="check-box">
    <el-input
      type="text"
      v-model="inputText"
      class="inputbox"
      placeholder="请输入验证码"
      size="large"
      ><template #prefix>
        <span class="iconfont icon-check_code"></span>
      </template>
    </el-input>

    <canvas
      ref="canvas"
      width="120"
      height="40"
      @click="refreshCanvas"
      class="check-canvas"
    ></canvas>
  </div>
</template>

<script>
import { reactive } from "vue";
const fromData = reactive({
  checkcode: "",
});
export default {
  data() {
    return {
      inputText: "",
      codeImageUrl: "",
      num: "",
    };
  },
  methods: {
    getColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    },
    draw() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, 120, 40); // 清空画布
      context.fillStyle = "#e0e0e0";
      context.fillRect(0, 0, 120, 40);

      const aCode = "0123456789abcdef".split("");
      let arr = [];
      for (let i = 0; i < 4; i++) {
        const x = 20 + i * 20;
        const y = 20 + Math.random() * 10;
        const index = Math.floor(Math.random() * aCode.length);
        const txt = aCode[index];
        context.font = "bold 20px 微软雅黑";
        context.fillStyle = this.getColor();
        context.translate(x, y);
        const deg = (Math.random() * 90 * Math.PI) / 180;
        context.rotate(deg);
        context.fillText(txt, 0, 0);
        context.rotate(-deg);
        context.translate(-x, -y);
        arr.push(txt);
      }
      this.num = arr.join("");

      for (let i = 0; i < 8; i++) {
        context.beginPath();
        context.moveTo(Math.random() * 120, Math.random() * 40);
        context.lineTo(Math.random() * 120, Math.random() * 40);
        context.strokeStyle = this.getColor();
        context.stroke();
      }

      for (let i = 0; i < 20; i++) {
        context.beginPath();
        const x = Math.random() * 120;
        const y = Math.random() * 40;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.strokeStyle = this.getColor();
        context.stroke();
      }

      this.codeImageUrl = canvas.toDataURL();
    },
    refreshCanvas() {
      this.draw();
    },
    verifyCode() {
      if (this.inputText === this.num) {
        return true;
        //alert("验证通过");
      } else {
        return false;
        //alert("验证失败");
      }
    },
  },
  mounted() {
    this.draw();
  },
};
</script>
<style>
.check-box {
  display: flex;
  align-items: center;
}

.check-canvas {
  margin-left: 10px;
}
</style>
