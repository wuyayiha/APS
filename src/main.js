import { createApp } from "vue";
import router from "./router";
// import './style.css'
import App from "./App.vue";
// import './mockData/login.js' // 引入 Mock 数据文件
// import './mockData/roles.js'
// import './mockData/scheduling.js'
// import './mockData/processManage.js'
import store from "./store/index"; // 引入 Vuex store
import "./permission"; // 导入全局路由守卫文件
import "./index.css";
// 导入 createPinia 函数
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
import VueSmoothScroll from "vue3-smooth-scroll";
app.use(VueSmoothScroll);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store); // 注册 Vuex store
app.use(router);
// 使用 createPinia() 来创建 Pinia（根存储），并应用到整个程序中
const pinia = createPinia(); // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount("#app");
