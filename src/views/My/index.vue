<template>
  <div id="my">
    <!-- 上半部分 -->
    <section class="head">
      <div class="userinfo">
        <div class="avatar">
          <img src="" alt="" />
          <span class="loginAndReg">登录/注册</span>
        </div>
        <div class="msg">
          <van-icon name="bell" class="bell" />
          <van-icon name="setting-o" class="setting" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      goods: [
        {
          s_id: 1,
          shopname: "螺狮粉之家",
          shopgoods: [
            {
              id: 1,
              goodsname: "麻辣螺狮粉",
              price: 34.2,
              num: 1,
            },
            {
              id: 2,
              goodsname: "酸辣螺狮粉",
              price: 34.6,
              num: 2,
            },
            {
              id: 3,
              goodsname: "原味螺狮粉",
              price: 32.7,
              num: 3,
            },
          ],
        },
        {
          s_id: 2,
          shopname: "康师傅泡面",
          shopgoods: [
            {
              id: 1,
              goodsname: "红烧牛肉泡面",
              price: 1.5,
              num: 4,
            },
            {
              id: 2,
              goodsname: "老坛酸菜泡面",
              price: 3.5,
              num: 2,
            },
          ],
        },
      ],
      totalprice: 0,
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
    padding: 0 vw(20);
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
    .huida {
      p {
        font-size: 12px;
        color: rgb(163, 162, 162);
      }
    }
  }
}
</style>