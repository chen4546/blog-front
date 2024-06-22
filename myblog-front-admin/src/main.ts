import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
//import Home from "./views/Home.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/icon/iconfont.css";

import Table from "./components/Table.vue";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);

app.component("Table", Table);
app.mount("#app");
