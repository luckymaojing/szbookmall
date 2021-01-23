<template>
  <div id="home">
      首页
    <toolbar></toolbar>
  </div>
</template>

<script>
import toolbar from "../../component/toolbar";
export default {
  data() {
    return {
      show: true,
    };
  },

  components: {
    toolbar,
  },

  methods: {
    dian() {
      this.show = !this.show;
    },
  },
  created(){
  }
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#home{
    height: vw(40);
}
</style>