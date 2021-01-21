<template>
  <div id="detail">
    <header class="container navtab" v-show="navTab">
      <span><van-icon name="arrow-left" @click="goback" /></span
      ><span><van-icon name="cart-o" @click="tocart" /></span>
    </header>
    <header class="container navtab2" v-show="!navTab">
      <span><van-icon name="arrow-left" @click="goback" /></span
      ><span><van-icon name="cart-o" /></span>
    </header>
    <main v-for="(item, index) in goods" :key="index">
      <img :src="item.s_imgUrl ? item.s_imgUrl : item.post" alt="" class="bg" />
      <div class="priceAnddescrib container">
        <div class="pricearea">
          <div class="newprice">
            <span
              >￥{{ item.s_m_price ? item.s_m_price : item.market_price }}</span
            ><span
              >VIP￥{{
                item.s_s_price ? item.s_s_price : item.sale_price
              }}</span
            >
          </div>
          <div class="oldprice">
            <s>￥{{ item.s_m_price ? item.s_m_price : item.market_price }}</s>
            <span>{{ item.theme ? item.theme : item.theme_name }}</span>
          </div>
        </div>
        <div class="title">{{ item.s_name ? item.s_name : item.name }}</div>
        <div class="desc">
          {{ item.s_title ? item.s_title : item.floor_name }}
        </div>
        <div class="goods_count">
          浏览次数 <span class="readnum">163</span> 销量
          <span class="sale">15</span>
        </div>
      </div>
      <div class="shopArea container">
        <div class="shop">
          <img src="" alt="" />
          <div class="phone"><span>浙江仓</span><span>0755-82460842</span></div>
          <div class="shopbar">
            <span>全部宝贝</span>
            <span>进店逛逛</span>
          </div>
        </div>
        <div class="advertisement"><span>广告</span></div>
      </div>
      <div class="recommendArea">
        <section class="clumn">
          <p class="new"><span>商家推荐</span><span>更多</span></p>
          <ul>
            <li
              v-for="item in goodsale"
              :key="item._id"
              @click="forDetail(item._id)"
            >
              <img :src="item.s_imgUrl ? item.s_imgUrl : defaultimg" alt="" />
              <p class="title">{{ item.s_name }}</p>
              <p class="price">
                <span class="newprice" style="color: red"
                  >￥{{ item.s_m_price }}</span
                ><span class="oldprice" style="color: #ccc"
                  >￥{{ item.s_s_price }}</span
                >
              </p>
            </li>
          </ul>
        </section>
      </div>
      <div class="intruduce container">
        <van-tabs v-model="active">
          <van-tab title="图文介绍" class="itrd">
            <p>
              <span>作者</span
              ><span>{{ item.s_author ? item.s_author : item.author }}</span>
            </p>
            <p>
              <span>国际标准书号ISBN</span
              ><span>{{ item.s_id ? item.s_id : item.code }}</span>
            </p>
            <p>
              <span>出版社</span
              ><span>{{ item.s_press ? item.s_press : item.press }}</span>
            </p>
            <p>
              <span>出版时间</span><span>{{ item.create_time }}</span>
            </p>
            <p>
              <span>开本</span><span>{{ item.sale_time }}</span>
            </p>
          </van-tab>
          <van-tab title="问答" class="question">
            <div>
              <van-icon name="question-o" /><span>有什么疑问，问问卖家吧</span>
            </div>
            <button>问问卖家</button>
          </van-tab>
        </van-tabs>
      </div>
    </main>
    <footer>
      <a><van-icon name="service-o" /><span>客服</span></a>
      <a><van-icon name="like" ref="lovecolor" @click="changecolor" /></a>
      <a class="buynow" @click="tocart">立即购买</a>
      <a class="addtocart" @click="addcart">加入购物车</a>
    </footer>
  </div>
</template>

<script>
import goodsApi from "../../api/goodsApi";
export default {
  data() {
    return {
      active: 2,
      goods: "", //显示来自bookcity页的数据
      goodsale: "",
      show: true,
      navTab: true,
      color: false,
    };
  },

  components: {},

  methods: {
    // 商家推荐商品
    fetch() {
      goodsApi.getdata(3, 150).then((res) => {
        this.goodsale = res.data.data.filter((item) => item.f_id == 557);
        this.goodsale = this.goodsale.slice(0, 3);
      });
    },
    // 获取页面数据
    getgoods() {
      let goodid = this.$route.query.id;
      if (this.$route.query.fowardpage == "bookcity") {
        goodsApi.getidData(goodid).then((res) => {
          this.goods = res.data.data;
        });
      } else if (this.$route.query.fowardpage == "list") {
        this.goods = JSON.parse(localStorage.getItem("lists")).filter(
          (item) => item._id == goodid
        );
      }
    },
    // 点击跳转到详情页
    forDetail(id) {
      this.goods = this.goodsale.filter((item) => item._id == id);
      // 触发事件后回到页面顶部
      window.scrollTo(0, 0);
    },
    // 退回上一页
    goback() {
      let goodid = this.$route.query.id;
      if (this.$route.query.fowardpage == "bookcity") {
        this.$router.push(this.$route.query.forwardpath);
      } else if (this.$route.query.fowardpage == "list") {
        this.$router.push(this.$route.query.forwardpath);
      }
    },
    // 鼠标滚动到一定位置导航条出现
    handlerScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > "300") {
        this.navTab = false;
      } else {
        this.navTab = true;
      }
    },
    // 去购物车
    tocart() {
      this.$router.push("/cart");
    },
    // 商品加入购物车
    addcart() {
      let adddata = this.goods.filter((item) => item._id == this.$route.id);
      let result = adddata.f_name ? adddata.f_name : adddata.name;
      // let username = localStorage.getItem("username");
      goodsApi.addcart("张三", result).then((res) => {
        this.$toast({
          message: "你的宝贝已经在购物车等你了哟！",
          icon: "like-o",
        });
      });
    },
    changecolor() {
      this.color=!this.color;
      if (this.color) {
        this.$refs.lovecolor.style.color = "#DA251C";
        this.$toast('宝贝已收藏！')
      }else{
        this.$refs.lovecolor.style.color = "#ccc";
      }
    },
  },
  created() {
    this.getgoods();
    this.fetch();
    window.addEventListener("scroll", this.handlerScroll); //默认调用触发window窗口高度
  },
};
</script>

<style lang="scss" scoped>
@function vw($px) {
  @return ($px/750) * 100vw;
}
.container {
  padding: 0 vw(30);
}
#detail {
  overflow: auto;
  margin-bottom: vw(80);
  .navtab {
    height: vw(80);
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    position: fixed;
    align-items: center;
    span {
      display: inline-block;
      &:nth-child(1) {
        padding-right: vw(600);
      }
    }
  }
  .navtab2 {
    height: vw(80);
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    background: white;
    box-shadow: 0 5px 10px -10px #ccc;
    position: fixed;
    align-items: center;
    span {
      display: inline-block;
      &:nth-child(1) {
        padding-right: vw(600);
      }
    }
  }
  main {
    background: #f9f9f9;
    .bg {
      width: 100%;
      height: vw(750);
      display: block;
    }
    .priceAnddescrib {
      background: white;
      margin-bottom: vw(20);
      .pricearea {
        width: 100%;
        height: vw(112);
        .newprice {
          width: 100%;
          display: flex;
          align-items: center;
          span {
            &:nth-child(1) {
              font-size: 28px;
              color: #da251c;
              margin-right: vw(14);
            }
            &:nth-child(2) {
              background: #000;
              color: white;
              border-radius: vw(10);
              font-size: 14px;
              padding: vw(6);
            }
          }
        }
        .oldprice {
          display: flex;
          justify-content: space-between;
          padding: vw(4);
          s {
            font-size: 12px;
            color: #ccc;
          }
          span {
            font-size: 12px;
            color: #ffa500;
          }
        }
      }
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-weight: bold;
        font-size: 14px;
        margin: 0;
        padding: vw(20) 0;
      }
      .desc {
        font-size: 14px;
        line-height: vw(50);
        color: #878787;
        margin-bottom: vw(20);
      }
      .goods_count {
        font-size: 12px;
        color: #878787;
      }
    }
    .shopArea {
      background: white;
      margin-bottom: vw(20);
      .shop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vw(30);
        img {
          width: vw(100);
          height: vw(100);
        }
        .phone {
          display: flex;
          flex-direction: column;
          margin-right: vw(50);
          span {
            padding-bottom: vw(16);
          }
        }
        .shopbar {
          span {
            border: 1px solid #da251c;
            color: #da251c;
            background: white;
            font-size: 14px;
            border-radius: vw(10);
            padding: vw(10);
            &:nth-child(1) {
              margin-right: vw(20);
            }
          }
        }
      }
      .advertisement {
        font-size: 12px;
        display: flex;
        align-items: center;
        height: vw(80);
        span {
          color: white;
          background: #da251c;
          border-radius: vw(6);
          padding: vw(4);
        }
      }
    }
    .recommendArea {
      width: 100%;
      background: white;
      margin-bottom: vw(20);
      .clumn {
        width: 95.6%;
        padding: 0 vw(16);
        background: white;
        margin-bottom: vw(8);
        .new {
          height: vw(80);
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: normal;
          margin-top: 0;
        }
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          li {
            display: flex;
            flex-direction: column;
            img {
              width: vw(216);
              height: vw(216);
              background: url(../../../public/image/default_000.jpg) no-repeat;
              background-size: 100%;
            }
            .title {
              width: vw(200);
              margin: vw(18) 0;
              font-weight: 500;
              height: vw(80);
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .price {
              margin: 0 0 vw(30) 0;
              font-size: 14px;
              .oldprice {
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
    .intruduce {
      background: white;
      .itrd {
        p {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          span {
            &:nth-child(1) {
              color: #878787;
            }
          }
        }
      }
      .question {
        text-align: center;
        padding-bottom: vw(80);
        div {
          padding: vw(30);
          &:nth-child(1) {
            color: #da251c;
            font-size: 14px;
          }
          span {
            color: #3e3e3e;
          }
        }
        button {
          background: white;
          color: #ccc;
          border: 1px solid #ccc;
          border-radius: vw(30);
          padding: vw(10);
        }
      }
    }
  }
  footer {
    width: 100%;
    background: white;
    height: vw(80);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #f9f9f9;
    z-index: 1;
    a {
      width: 100%;
      height: 100%;
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: 14px;
      &:nth-child(1) {
        flex-direction: column;
        font-size: 12px;
        span {
          margin-top: vw(8);
        }
      }
      &:nth-child(1)::before {
        content: "";
        height: 20px;
        width: 1px;
        background: #e5e5e5;
        position: absolute;
        top: calc(50% - 10px);
        right: 0;
      }
      &:nth-child(2) {
        color: #ccc;
        font-size: 18px;
      }
      &:nth-child(2)::before {
        content: "";
        height: 20px;
        width: 1px;
        background: #e5e5e5;
        position: absolute;
        top: calc(50% - 10px);
        right: 0;
      }
      &:nth-child(4) {
        background: #da251c;
        color: white;
      }
    }
  }
}
</style>