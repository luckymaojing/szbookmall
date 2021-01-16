<template>
  <div id="search_bar">
    <div class="logo">
      <img src="https://h5.szbookmall.com/img/logo.ea658e8c.svg" alt="" />
    </div>
    <van-search v-model="value" shape="round" @focus="goto"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  components: {},

  methods: {
    goto(){
      this.$router.push('/bookcitysearch');
    }
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#search_bar {
  width: 100%;
  height: vw(76);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: vw(20) 0;
  position: relative;
  background: white;
  .logo {
    width: vw(68);
    height: vw(32);
    margin-left: vw(40);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-search {
    width: 85%;
    .van-cell {
      align-items: center;
    }
  }
  .van-search__content {
    height: vw(48);
    padding-left: vw(28);
  }
}
</style>