<template>
  <div id="pswLogin">
    <div class="container">
      <van-icon name="arrow-left" class="left-arrow" @click="tophoneyz" />
      <main>
        <div class="title">设置密码</div>
        <form action="">
          <input
            type="password"
            placeholder="请输入新密码"
            v-model="newpsw"
            maxlength="11"
          />
          <input
            type="password"
            placeholder="请再次输入密码"
            v-model="qrpsw"
            maxlength="6"
          />
          <van-button type="default" class="login" @click="login">
            确定</van-button
          >
          <p class="tiaoguo">跳过</p>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import userApi from "../../api/userApi";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      newpsw: "",
      qrpsw: "",
    };
  },

  components: {},
  methods: {
    // 点击登录按钮
    login() {
      // 验证密码是否符合格式
      let testpsw = /[0-9A-Za-z]{6,10}/;
      let psw = testpsw.test(this.newpsw);
      // 如果两次输入的密码是否一样
      if (!psw) {
        this.$toast({
          message: "密码格式有误，请重填",
        });
      } else if (this.newpsw != this.qrpsw) {
        this.$toast({
          message: "两次密码输入不一致，请重新输入",
        });
      } else if (this.newpsw == this.qrpsw) {
        //如果两次输入的密码一样
        const uid = JSON.parse(localStorage.getItem("uid"));
        const usertype = JSON.parse(localStorage.getItem("userID"));
        // 加密
        const yourpsw = CryptoJS.SHA256(this.newpsw).toString();
        userApi.reg(uid, yourpsw, usertype).then((res) => {
          userApi.login(uid, yourpsw).then((res) => {
            // 将token保存到本地
            localStorage.setItem("token", JSON.stringify(res.data.token));
            // 跳转到我的页
            this.$router.push("/my");
          });
        });
      }
    },
    // 点击跳转账号密码登录
    loginWithpsw() {
      this.$router.push("/login");
    },
    // 点击跳转到手机号验证码页
    tophoneyz() {
      this.$router.push("/my");
    },
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
.container {
  padding: 0 vw(60);
  .left-arrow {
    padding: vw(30) 0 vw(100) 0;
    font-size: 24px;
  }
  main {
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      padding: 0 0 vw(180) 0;
    }
    form {
      input {
        border: none;
        font-size: 12px;
        line-height: vw(90);
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      .login {
        width: 100%;
        height: vw(80);
        text-align: center;
        line-height: vw(80);
        color: white;
        background: #ccc;
        border-radius: vw(16);
        border: none;
        margin-bottom: vw(60);
        margin-top: vw(40);
        background: #3e3e3e;
      }
      .tiaoguo {
        width: 90%;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>