import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//引入vant
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(DatePicker);

Vue.config.productionTip = false;
//环境配置
Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
