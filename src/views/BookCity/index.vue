<template>
  <div id="bookcity">
    <search></search>
    <main>
    </main>
    <toolbar></toolbar>
  </div>
</template>

<script>
import search from "../../component/search";
import toolbar from "../../component/toolbar";
export default {
  data() {
    return {
      value: "",
    };
  },

  components: {
    search,
    toolbar,
  },

  methods: {},
  created() {},
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