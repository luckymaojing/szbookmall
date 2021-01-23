<template>
  <div id="pswLogin">
    <!-- 一个隐藏域用于判断页面有值的输入框的数量 -->
    <div style="display: none">{{ exitsVal }}</div>
    <div class="container">
      <van-icon name="arrow-left" class="left-arrow" @click="tophoneyz" />
      <main>
        <div class="title">密码登录</div>
        <form action="">
          <input
            type="text"
            placeholder="请输入用户名或手机号码"
            v-model="phone"
            maxlength="11"
          />
          <input
            type="password"
            placeholder="请输入密码"
            v-model="password"
            maxlength="6"
          />
          <p class="forgetpsw"><span>忘记密码</span></p>
          <div class="server">
            <van-checkbox v-model="checked" icon-size="15px"></van-checkbox>
            <div class="desc">
              登录即代表同意深圳书城<span style="color: #5995ef">服务协议</span
              >和<span style="color: #5995ef">隐私政策</span>
            </div>
          </div>
          <van-button
            :disabled="logindisable"
            type="default"
            class="login"
            :style="{ background: logindisable ? '' : '#000' }"
            @click="login"
          >
            登录</van-button
          >
          <p class="reg">还没有账号，立即注册</p>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      phone: "",
      password: "",
      formData: "",
      logindisable: true,
    };
  },

  components: {},
  computed: {
    //  判断页面中有值的输入框的数量
    exitsVal: function () {
      this.formData =
        Number(Boolean(this.phone)) +
        Number(Boolean(this.password)) +
        Number(Boolean(this.checked));
    },
  },
  watch: {
    formData(newVal, oldVal) {
      //  判断输入框都有值将disabled改为false
      if (Number(newVal) === 3) {
        // 三个input框内都有值时需要做的操作
        this.logindisable = false;
      } else {
        this.logindisable = true;
      }
    },
  },
  methods: {
    // 点击登录按钮
    login() {
      // 验证手机号是否符合格式
      let testphone = /^1[3-9]\d{9}$/;
      let testpsw = /[0-9A-Za-z]{6,10}/;
      // 如果验证都通过
      if (
        testphone.test(this.phone) &&
        this.checked &&
        testpsw.test(this.password)
      ) {
        // 发送请求验证用户名和密码是否存在
        // 设置用户名和token到本地
        // localStorage.setItem("uid", JSON.stringify(this.phone));
        // this.$router.push("/home");
      } else if (!testphone.test(this.phone)) {
        this.$toast({
          message: "手机号格式有误，请重填",
        });
      } else if (!this.checked) {
        this.$toast({
          message: "请勾选协议",
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
      padding: 0 0 vw(220) 0;
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
      .forgetpsw {
        text-align: right;
        font-size: 12px;
      }
      .server {
        display: flex;
        margin: vw(120) 0 vw(60) 0;
        display: flex;
        align-items: center;
        .desc {
          font-size: 13px;
          margin-left: vw(10);
          color: rgb(126, 124, 124);
        }
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
      }
      .reg {
        text-align: center;
        padding-bottom: vw(30);
      }
    }
  }
}
</style>