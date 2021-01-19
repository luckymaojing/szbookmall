import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelazylad from "vue-lazyload";

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

import { Lazyload } from "vant";
import VueLazyload from "vue-lazyload";
Vue.use(Lazyload);
Vue.use(Vant);

Vue.use(VueLazyload,{
  loading:require('../public/image/default_000.jpg')
})

//环境配置
Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
