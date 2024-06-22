<template>
  <div>
    <input v-model="title" placeholder="请输入博客标题" />
    <div ref="editor" style="text-align: left"></div>
    <el-button type="primary" @click="handleSubmit">upload</el-button>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "Editor",
  props: {
    modelValue: {
      type: Object,
      default: () => ({ title: "", content: "" }),
    },
  },
  data() {
    return {
      title: this.modelValue.title,
      editor: null,
      editorContent: this.modelValue.content,
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.title = newVal.title;
        this.editorContent = newVal.content;
      },
      deep: true,
    },
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor);
      editor.config.height = 500; // 设置编辑器高度
      editor.config.zIndex = 100; // 设置编辑器层级
      editor.config.fontSizes = {
        default: "16px",
        small: "14px",
        large: "18px",
      }; // 设置字体大小
      editor.config.onchange = (newHtml) => {
        this.editorContent = newHtml;
        this.$emit("update:modelValue", {
          title: this.title,
          content: newHtml,
        });
      };
      editor.create();
      this.editor = editor;
    },
    handleSubmit() {
      this.$emit("submit", { title: this.title, content: this.editorContent });
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
