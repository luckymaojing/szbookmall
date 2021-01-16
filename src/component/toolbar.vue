<template>
  <div id="toolbar">
    <!-- 底部 -->
    <van-tabbar v-model="active" active-color="#DA251c" inactive-color="#000">
      <van-tabbar-item v-for="item in icon" :key="item.title">
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import home from "../../public/image/home.png";
import homeRed from "../../public/image/homeRed.png";
import my from "../../public/image/my.png";
import myRed from "../../public/image/myRed.png";
import bookcity from "../../public/image/bookcity.png";
import bookcityRed from "../../public/image/bookcityRed.png";
import shopcart from "../../public/image/shopcart.png";
import shopcartRed from "../../public/image/shopcartRed.png";
import category from "../../public/image/category.png";
import categoryRed from "../../public/image/categoryRed.png";

export default {
  data() {
    return {
      icon: [
        {
          id: 1,
          active: homeRed,
          inactive: home,
          title: "首页",
        },
        {
          id: 2,
          active: categoryRed,
          inactive: category,
          title: "分类",
        },
        {
          id: 3,
          active: bookcityRed,
          inactive: bookcity,
          title: "书城",
        },
        {
          id: 4,
          active: shopcartRed,
          inactive: shopcart,
          title: "购物车",
        },
        {
          id: 5,
          active: myRed,
          inactive: my,
          title: "我的",
        },
      ],
      active: 0,
    };
  },

  components: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#toolbar {
  width: 100%;
  height: vw(100);
  display: flex;
  background: white;
}
</style>