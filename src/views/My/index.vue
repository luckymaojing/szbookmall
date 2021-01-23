<template>
  <div id="my">
    <!-- 一个隐藏域用于判断页面有值的输入框的数量 -->
    <div style="display: none">{{ exitsVal }}</div>
    <!-- 上半部分 -->
    <section class="head">
      <div class="userinfo">
        <div class="avatar">
          <img src="../../../public/image/avatar.c77dd9ca.png" alt="" />
          <span class="loginAndReg" @click="showmask" v-show="isshowuser"
            >登录/注册</span
          >
          <div
            class="userarea"
            style="
              width: 100px;
              height: 75px;
              display: flex;
              flex-direction: column;
              font-size: 14px;
              justify-content: center;
              align-items: center;
              line-height: 30px;
            "
            v-show="!isshowuser"
          >
            <span class="setname" style="font-size: 16px; font-weight: bold"
              >请设置昵称</span
            >
            <span
              class="menmber"
              style="color: #ccc; display: flex; align-items: center"
              ><van-icon name="gem-o" />{{ this.usertype }}</span
            >
          </div>
        </div>
        <div class="msg">
          <van-icon name="bell" class="bell" />
          <van-icon name="setting-o" class="setting" @click="toquit" />
        </div>
      </div>
      <ul class="card">
        <li>
          <span>￥ 0</span>
          <span>智慧卡</span>
        </li>
        <li>
          <span>0 分</span>
          <span>会员积分</span>
        </li>
        <li>
          <span>0 张</span>
          <span>优惠券</span>
        </li>
        <li>
          <span>￥ 0</span>
          <span>团体会员</span>
        </li>
      </ul>
    </section>
    <!-- 名言 -->
    <section class="quote">
      <p>"所有的大人都曾经是小孩，虽然，只有少数人记得"</p>
      <p>——安托万·德·圣·埃克苏佩里</p>
    </section>
    <!-- 我的订单 -->
    <section class="order">
      <div class="title">
        <span>我的订单</span>
        <span>更多</span>
      </div>
      <ul>
        <li>
          <van-icon name="pending-payment" />
          <span>待付款</span>
        </li>
        <li>
          <van-icon name="send-gift-o" />
          <span>待发货</span>
        </li>
        <li>
          <van-icon name="logistics" />
          <span>已发货</span>
        </li>
        <li>
          <van-icon name="balance-pay" />
          <span>退款/售后</span>
        </li>
      </ul>
    </section>
    <!-- 收藏 -->
    <section class="collection">
      <div class="title">
        <span>收藏</span>
        <span>更多</span>
      </div>
      <div class="goods">
        <p>商品</p>
        <p>没有收藏商品~</p>
      </div>
      <div class="business">
        <p>商家</p>
        <p>没有收藏商户~</p>
      </div>
    </section>
    <!-- 我的回答 -->
    <section class="answer">
      <div class="title">
        <span>我的问答</span>
        <span>更多</span>
      </div>
      <div class="huida">
        <p>没有任何回答~</p>
      </div>
    </section>
    <toolbar></toolbar>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p class="close"><van-icon name="cross" @click="closemask" /></p>
          <div class="logo">
            <img src="https://h5.szbookmall.com/img/logo.ea658e8c.svg" alt="" />
          </div>
          <p class="phonenumber">
            <select class="label">
              <option>+86</option>
              <option>+886</option>
              <option>+852</option>
              <option>+853</option>
            </select>
            <input
              type="text"
              v-model="phone"
              placeholder="请输入手机号码"
              maxlength="11"
            />
          </p>
          <div class="yzm">
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="yzm"
              maxlength="6"
            />
            <van-button
              :disabled="disable"
              @click="getyzm"
              ref="yzm"
              class="getvcode"
              type="default"
              ><span v-show="time">获取验证码</span
              ><span v-show="!time"
                >重新发送( {{ this.second }} )</span
              ></van-button
            >
          </div>
          <div class="server">
            <van-checkbox v-model="checked" icon-size="15px"></van-checkbox>
            <div class="desc">
              <span
                >登录即代表同意深圳书城<span style="color: #5995ef"
                  >服务协议</span
                >和<span style="color: #5995ef">隐私政策</span></span
              >
            </div>
          </div>
          <van-button
            :disabled="logindisable"
            type="default"
            class="loginOrreg"
            :style="{ background: logindisable ? '' : '#000' }"
            @click="login"
          >
            登录/注册</van-button
          >
          <div class="actAndPswlogin" @click="loginWithpsw">账号和密码登录</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import toolbar from "../../component/toolbar";
import userApi from "../../api/userApi";
import { getCookie, setCookie } from "../../utils/cookie";
export default {
  data() {
    return {
      checked: false,
      show: true,
      phone: "",
      yzm: "",
      second: 60,
      time: true,
      disable: false,
      logindisable: true,
      active: false,
      formData: "",
      isshowuser: true,
      usertype: "",
    };
  },

  components: {
    toolbar,
  },

  computed: {
    //  判断页面中有值的输入框的数量
    exitsVal: function () {
      this.formData =
        Number(Boolean(this.phone)) +
        Number(Boolean(this.yzm)) +
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
    // 显示遮罩层
    showmask() {
      this.show = true;
    },
    // 关闭遮罩层
    closemask() {
      this.show = false;
    },
    // 获取验证码
    getyzm() {
      // 验证手机号是否符合格式
      let testphone = /^1[3-9]\d{9}$/;
      if (testphone.test(this.phone)) {
        userApi.getvcode().then((res) => {
          this.$toast({
            message: "您的验证是" + res.data + "请在一分钟之内完成验证",
          });
          setCookie("messagecode", res.data, 1);
          this.time = false;
          this.disable = true;
          // 短信验证码倒计时
          let timer = setInterval(() => {
            this.second--;
            this.disable = true;
            if (this.second == 0) {
              this.time = true;
              this.disable = false;
              this.isbgcolor = false;
              clearInterval(timer);
              setCookie("messagecode", res.data, -1);
              this.second = 60;
            }
          }, 1000);
        });
      }
      this.$toast({
        message: "手机号有误，请重填",
      });
    },
    // 点击登录按钮
    login() {
      // 验证手机号是否符合格式
      let testphone = /^1[3-9]\d{9}$/;
      let yzm = getCookie("messagecode");
      // 如果验证都通过
      if (testphone.test(this.phone) && this.yzm == yzm && this.checked) {
        // 发送请求验证用户名是否存在
        userApi.checkname(this.phone).then((res) => {
          // 如果用户不存在就注册
          if (res.data.code === 2000) {
            this.usertype = "普通会员";
            // 关闭遮罩层
            this.show = false;
            this.isshowuser = false;
            // 设置用户名本地
            localStorage.setItem("uid", JSON.stringify(this.phone));
            // 设置用户身份到本地
            localStorage.setItem("userID", JSON.stringify(this.usertype));
            // 跳转至设置密码页
            this.$router.push("/setpsw");
          } else {
            res.data.data.forEach((item) => {
              this.usertype = item.usertype;
              // 设置用户身份到本地
              localStorage.setItem("userID", JSON.stringify(this.usertype));
            });
            // 关闭遮罩层
            this.show = false;
            this.isshowuser = false;
            // 设置用户名本地
            localStorage.setItem("uid", JSON.stringify(this.phone));
          }
        });
      } else if (!testphone.test(this.phone)) {
        this.$toast({
          message: "手机号格式有误，请重填",
        });
      } else if (this.yzm != yzm) {
        this.$toast({
          message: "验证码不匹配",
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
    // 去退出页
    toquit(){
      this.$router.push('/quit');
    }
  },
  created() {
    // 进入这个页面判断用户是否登录以及用户身份
    if (
      JSON.parse(localStorage.getItem("uid")) &&
      JSON.parse(localStorage.getItem("userID"))
    ) {
      this.isshowuser = false;
      this.usertype = JSON.parse(localStorage.getItem("userID"));
      this.show = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
#my {
  background: #f9f9f9;
  .title {
    height: vw(80);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .head {
    height: vw(346);
    padding: vw(30);
    background: white;
    margin-bottom: vw(24);
    .userinfo {
      height: vw(150);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .avatar {
        display: flex;
        align-items: center;
        img {
          width: vw(150);
          height: vw(150);
          border-radius: 50%;
          display: block;
        }
        .loginAndReg {
          display: inline-block;
          color: #da251c;
          padding: vw(8);
          border-radius: vw(24);
          border: 1px solid #da251c;
          margin-left: vw(30);
        }
      }
      .msg {
        font-size: 20px;
        .bell {
          margin-right: vw(30);
          color: rgb(122, 122, 122);
        }
      }
    }
    .card {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: vw(60);
      li {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1;
        font-size: 14px;
        span {
          &:nth-child(1) {
            color: #da251c;
            font-weight: bold;
          }
          &:nth-child(2) {
            color: #6e6e6e;
            margin-top: vw(20);
          }
        }
      }
    }
  }
  .quote {
    font-size: 12px;
    padding: vw(40) vw(30);
    background: #fff7df;
    margin-bottom: vw(24);
    p {
      &:nth-child(2) {
        text-align: right;
      }
    }
  }
  .order {
    padding: 0 vw(20);
    background: white;
    margin-bottom: vw(24);
    ul {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: vw(30);
      color: rgb(107, 106, 106);
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 250%;
        .van-icon {
          font-size: 30px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
  .collection {
    margin-bottom: vw(24);
    background: white;
    padding: 0 vw(20) vw(20);
    .goods {
      p {
        &:nth-child(1) {
          font-size: 14px;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: rgb(163, 162, 162);
        }
      }
    }
    .business {
      p {
        &:nth-child(1) {
          font-size: 14px;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: rgb(163, 162, 162);
        }
      }
    }
  }
  .answer {
    padding: 0 vw(20);
    background: white;
    margin-bottom: vw(80);
    padding-bottom: vw(20);
    .huida {
      p {
        font-size: 12px;
        color: rgb(163, 162, 162);
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 70%;
    background-color: #fff;
    padding: vw(30) vw(60);
    .close {
      text-align: right;
    }
    .logo {
      text-align: center;
      img {
        width: 40%;
      }
    }
    .phonenumber {
      width: 100%;
      border-bottom: 1px solid #000;
      line-height: vw(90);
      margin: 0;
      .label {
        border: none;
      }
      input {
        border: none;
        font-size: 12px;
        width: 78%;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
    }
    .yzm {
      width: 100%;
      border-bottom: 1px solid #000;
      line-height: vw(100);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      input {
        border: none;
        font-size: 12px;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      .getvcode {
        width: vw(380);
        height: vw(100);
        font-size: 13px;
        border: none;
        padding: 0;
      }
    }
    .server {
      width: 100%;
      font-size: 13px;
      color: #666565;
      padding: vw(60) 0;
      display: flex;
      .desc {
        margin-left: vw(10);
      }
    }
    .loginOrreg {
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
    .userarea {
      height: vw(150);
      display: flex;
      flex-direction: column;
    }
    .actAndPswlogin {
      text-align: center;
      padding-bottom: vw(30);
    }
  }
}
</style>