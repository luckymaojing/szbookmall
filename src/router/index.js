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
    path: "/my",
    name: "my",
    component: () => import('../views/My'),
    meta: {
      title: '我的页'
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
  {
    path: "/detail",
    name: "detail",
    component: () => import('../views/Detail'),
    meta: {
      title: '详情页'
    },
  },
  {
    path: "/list",
    name: "list",
    component: () => import('../views/List'),
    meta: {
      title: '列表页'
    },
  },
];

const router = new VueRouter({
  mode: "hash",//上线修改为history
  base: process.env.BASE_URL,
  routes
});

export default router;
