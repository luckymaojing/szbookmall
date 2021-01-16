import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

import { Lazyload } from "vant";
Vue.use(Lazyload);
Vue.use(Vant);

//环境配置
Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
