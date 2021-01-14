import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/Home'),
    meta: {
      title: '首页'
    },
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import('../views/Reg'),
    meta: {
      title: '登录页'
    },
  },
  {
    path: "/bookcity",
    name: "bookcity",
    component: () => import('../views/BookCity'),
    meta: {
      title: '书城页'
    },
  },
  {
    path: "/bookcitysearch",
    name: "bookcitysearch",
    component: () => import('../views/BookcitySearch'),
    meta: {
      title: '书城页'
    },
  },
];

const router = new VueRouter({
  mode: "hash",//上线修改为history
  base: process.env.BASE_URL,
  routes
});

export default router;
