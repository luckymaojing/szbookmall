<template>
  <div id="bookcity">
    <search></search>
    <main>
      <!-- title部分 -->
      <van-tabs v-model="active">
        <van-tab
          :title="item.title"
          v-for="(item, index) in titles"
          :key="index"
        >
        </van-tab> </van-tabs
      ><!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" height="168" />
        </van-swipe-item>
      </van-swipe>
      <ul>
        <li></li>
      </ul>
    </main>
    <toolbar></toolbar>
  </div>
</template>

<script>
//引入goodsapi
import goodsApi from "../../api/goodsApi";
import search from "../../component/search";
import toolbar from "../../component/toolbar";
import banner1 from "../../../public/image/banner1.jpg";
import banner2 from "../../../public/image/banner2.jpg";
import banner3 from "../../../public/image/banner3.jpg";
import banner4 from "../../../public/image/banner4.jpg";
import banner5 from "../../../public/image/banner5.jpg";
import banner6 from "../../../public/image/banner6.jpg";
import banner7 from "../../../public/image/banner7.jpg";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  data() {
    return {
      value: "",
      active: 0,
      titles: [
        { title: "推荐" },
        { title: "小说" },
        { title: "文学" },
        { title: "经管" },
        { title: "历史" },
        { title: "社科" },
        { title: "哲学" },
        { title: "政治" },
        { title: "法律" },
        { title: "艺术" },
        { title: "生活" },
        { title: "科技" },
        { title: "考试" },
      ],
      images: [banner1, banner2, banner3, banner4, banner5, banner6, banner7],
      magicpage: "",
    };
  },

  components: {
    search,
    toolbar,
  },

  methods: {
    fetch() {
      goodsApi.getdata(1,2).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#bookcity {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  main {
    flex: 1;
    background: red;
  }
}
</style>