<template>
  <div id="quit">
    <head>
      <div class="tool">
        <van-icon name="arrow-left" class="leavebar" @click="goto" />
        <span class="category">个人设置</span>
      </div>
      <div class="userinfo">
        <img src="../../../public/image/avatar.c77dd9ca.png" alt="" />
        <div class="username">
          <span>{{ username }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </head>
    <main>
      <div class="myresaveAddress">
        <span>我的收货地址</span> <van-icon name="arrow" />
      </div>
      <div class="mypapire">
        <span>我的发票</span> <van-icon name="arrow" />
      </div>
      <div class="userarea">
        <div class="help"><span>帮助中心</span> <van-icon name="arrow" /></div>
        <div class="agreement">
          <span>用户协议</span> <van-icon name="arrow" />
        </div>
        <div class="edition"><span>版本升级</span> V3.5.6</div>
      </div>
    </main>
    <footer @click="quitAcount">退出账户</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },

  components: {},

  methods: {
    //   去我的页
    goto() {
      this.$router.push("/my");
    },
    // 退出账户
    quitAcount() {
      localStorage.removeItem("uid");
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      // 回到我的页
      this.$router.push("/my");
    },
  },
  created() {
    //   进入页面显示用户信息
    this.username = JSON.parse(localStorage.getItem("uid"));
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#quit {
  background: #f9f9f9;
  head {
    display: flex;
    flex-direction: column;
    background: white;
    padding: vw(30) vw(30);
    margin-bottom: vw(30);
    .tool {
      width: 100%;
      height: vw(88);
      font-size: 20px;
      font-weight: bold;
      line-height: vw(88);
      border-bottom: 1px solid #f9f9f9;
      text-align: center;
      position: relative;
      .leavebar {
        position: absolute;
        left: 6%;
        top: 25%;
      }
      .category {
        font-size: 17px;
      }
    }
    .userinfo {
      display: flex;
      img {
        width: vw(150);
        height: vw(150);
      }
      .username {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  main {
    margin-top: vw(30);
    .myresaveAddress {
      height: vw(88);
      display: flex;
      margin: vw(40) 0;
      padding: 0 vw(30);
      background: white;
      justify-content: space-between;
      align-items: center;
    }
    .mypapire {
      height: vw(88);
      display: flex;
      margin: vw(40) 0;
      padding: 0 vw(30);
      background: white;
      justify-content: space-between;
      align-items: center;
    }
    .userarea {
      line-height: vw(88);
      background: white;
      padding: 0 vw(30);
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: vw(88);
    background: #da251c;
    text-align: center;
    line-height: vw(88);
    color: white;
  }
}
</style>