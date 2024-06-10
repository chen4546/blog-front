import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  /*server: {
    hmr:true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        '^/api': '/api'
      }
  }*/
  /* resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },*/
});
