<template>
  <div id="cart">
    <div class="head">
      <van-row class="title">
        <van-col span="4"></van-col>
        <van-col span="16">购物车</van-col>
        <van-col span="4">
          <van-icon class="title-edit" name="edit" />
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="list">
        <div class="form">
          <div class="list-title">
            共
            <span class="allcount">5</span> 件商品
          </div>
          <div class="list-content" v-for="(item,index) in goodslist" :key="item.id">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
              <!-- 二级复选框 -->
              <van-checkbox
                class="cangku"
                @click="checkSec(index)"
                v-model="allcang"
                checked-color="black"
                icon-size="16px"
                :name="'cangku'+index"
                ref="second"
              >
                {{item.title}}
                <van-icon
                  name="arrow"
                  style="vertical-align: middle;font-size:16px; font-weight:800;margin-left:5px"
                />
              </van-checkbox>
              <van-checkbox-group v-model="list">
                <div v-for="(good,ind) in item.goods" :key="good.gid">
                  <van-list ref="list">
                    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                    <div class="commodity">
                      <!-- 三级复选框 -->
                      <van-checkbox
                        class="list-check"
                        checked-color="black"
                        icon-size="16px"
                        ref="third"
                        :name="index +'list'+ind"
                      ></van-checkbox>
                      <div class="list-main">
                        <div class="list-img">
                          <img :src="good.imgurl" />
                        </div>
                        <div class="list-message">
                          <div class="message-title">{{good.title}}</div>
                          <div class="message-price">
                            <div class="price">
                              ￥
                              <span ref="goodsprice" class="unit">{{good.price.toFixed(2) }}</span>
                            </div>
                            <van-field class="count" name="stepper">
                              <template #input>
                                <van-stepper ref="goodscount" v-model="good.count" />
                              </template>
                            </van-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </van-list>
                </div>
              </van-checkbox-group>
            </van-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="isvip">开通vip会员，享受更多折扣</div>
    <div class="push">
      <van-row>
        <van-col span="8">
          <van-checkbox-group v-model="all" class="allcheck">
            <van-checkbox
              name="1"
              @click="quanxuan"
              v-model="allchoose"
              checked-color="black"
              icon-size="16px"
            >全选</van-checkbox>
          </van-checkbox-group>
        </van-col>
        <van-col span="8" class="heji">
          合计 ￥
          <span class="allprice">{{ allprice.toFixed(2) }}</span>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="7" class="xiadan">下单</van-col>
      </van-row>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
import img from "./img/0.jpg";
export default {
  name: "cart",
  data() {
    return {
      stepper: 1,
      flag: 0,
      secflag: [],
      allprice: 0,
      result: [],
      list: [],
      all: [],
      totalprice: [],
      goodslist: [
        {
          id: 1,
          title: "湖南仓",
          goods: [
            {
              gid: 1,
              title: "孤独星球 童书系列 旅行百变贴纸游戏书 共6册",
              price: 120.1,
              count: 1,
              imgurl: img,
            },
            {
              gid: 2,
              title: "孤独星球 童书系列 旅行百变贴纸游戏书 共6册",
              price: 120.0,
              count: 2,
              imgurl: img,
            },
            {
              gid: 3,
              title: "孤独星球 童书系列 旅行百变贴纸游戏书 共6册",
              price: 120.0,
              count: 3,
              imgurl: img,
            },
          ],
        },
        {
          id: 2,
          title: "广州仓",
          goods: [
            {
              gid: 10,
              title: "孤独星球 童书系列 旅行百变贴纸游戏书 共6册",
              price: 120.01,
              count: 2,
              imgurl: img,
            },
            {
              gid: 20,
              title: "孤独星球 童书系列 旅行百变贴纸游戏书 共6册",
              price: 120.0,
              count: 2,
              imgurl: img,
            },
          ],
        },
      ],
    };
  },
  async created() {
    this.goodslist.forEach((item) => {
      item.goods.forEach((items) => {
        this.totalprice.push(items.price * items.count).toFixed(2);
      });
    });
    this.totalprice.reduce((total, item) => {
      this.allprice += parseFloat(item * 1).toFixed(2) * 1;
    }, 0);
    this.totalprice = [];
  },
  computed: {
    //三级控制一级
    allchoose: {
      get() {
        let len = 0;
        this.goodslist.forEach((item) => {
          len += item.goods.length * 1;
        });
        if (this.list.length == len) {
          this.all.push("1");
        } else {
          this.all = [];
        }
      },
    },
    allcang: {
      //三级控制二级
      get() {
        let len = 0;
        this.result = [];
        this.goodslist.forEach((item, index) => {
          len = item.goods.length * 1;
          let second = [];
          this.list.sort().forEach((items, ind) => {
            if (items.slice(0, 1) == index) {
              second.push(items);
            }
          });
          if (second.length == len) {
            this.result.push("cangku" + index);
          }
        });
      },
    },
  },
  watch: {
    goodslist: {
      deep: true,
      handler(goodslist) {
        this.allprice = 0;
        goodslist.forEach((item) => {
          item.goods.forEach((items) => {
            this.totalprice.push(items.price * items.count).toFixed(2);
          });
        });
        this.totalprice.reduce((total, item) => {
          this.allprice += parseFloat(item * 1).toFixed(2) * 1;
          console.log(this.allprice);
        }, 0);
        this.totalprice = [];
      },
    },
  },
  methods: {
    //二级控制三级
    checkSec(index) {
      // this.list = []
      if (
        this.result.indexOf("kangcu" + index) == -1 &&
        this.secflag.indexOf(index) == -1
      ) {
        this.$refs.third.forEach((item) => {
          if (item.name.slice(0, 1) == index) {
            this.list.push(item.name);
          }
        });
        this.secflag.push(index);
      } else {
        // console.log(this.list.length);
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          if (item.slice(0, 1) == index) {
            this.list.splice(this.list.indexOf(item), 1);
            i--;
          }
        }
        this.secflag.sort().splice(index, 1);
        console.log(this.secflag);
      }
    },
    //一级控制三级
    quanxuan() {
      if (this.all[0] == 1 && this.flag == 0) {
        for (let i = 0; i < this.goodslist.length; i++) {
          this.result.push("cangku" + i);
          this.checkSec(i);
        }
        this.flag = 1;
      } else {
        this.result = [];
        this.list = [];
        this.flag = 0;
      }
    },
  },
};
</script>

<style lang="scss">
@function vw($px) {
  @return ($px / 750) * 100vw;
}
html,
body,
#app {
  height: 100%;
  #cart {
    background-color: #f8f8f8;
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      .title {
        height: vw(88);
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: vw(86);
        font-weight: bold;
        background-color: #fff;
        .title-edit {
          font-size: vw(40);
          line-height: vw(86);
        }
      }
    }
    .content {
      background-color: #f8f8f8;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow-y: auto;
      .list {
        display: flex;
        flex-direction: column;
        .form {
          width: 100%;
          .list-title {
            width: 100%;
            background-color: #fff;
            color: #a9a9a9;
            font-size: vw(24);
            line-height: vw(32);
            padding: vw(24) vw(30);
            box-sizing: border-box;
            border-bottom: 1px solid #f5f5f5;
          }
          .list-content {
            background-color: #fff;
            padding-left: vw(30);
            margin-bottom: vw(30);
            .cangku {
              font-size: vw(28);
              height: vw(88);
              margin-bottom: vw(30);
            }
            .commodity {
              height: vw(180);
              display: flex;
              align-content: center;
              width: 100%;
              padding-bottom: vw(30);
              .list-check {
                width: vw(42);
              }
              .list-main {
                display: flex;
                .list-img {
                  width: vw(180);
                  margin-left: vw(20);
                  margin-right: vw(30);
                  display: flex;
                  justify-content: center;
                  img {
                    height: vw(180);
                    max-width: vw(200);
                    min-width: vw(140);
                  }
                }
                .list-message {
                  width: vw(420);
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  font-size: vw(28);
                  .message-price {
                    display: flex;
                    justify-content: space-between;
                    .price {
                      line-height: vw(52);
                      color: #da251c;
                      .unit {
                        font-weight: bold;
                      }
                    }
                    .count {
                      width: vw(210);
                      height: vw(52);
                      display: flex;
                      text-align: center;
                      line-height: vw(50);
                      padding: 0;
                      .van-stepper__minus {
                        border: 1px solid #e8e8e8;
                        background-color: #fff;
                        box-sizing: border-box;
                        height: vw(48);
                        border-radius: 50% 0 0 50%;
                        border-right: 0;
                      }
                      input {
                        margin: 0;
                        border-top: 1px solid #e8e8e8;
                        border-bottom: 1px solid #e8e8e8;
                        background-color: #fff;
                        height: vw(48);
                      }
                      .van-stepper__plus {
                        border: 1px solid #e8e8e8;
                        background-color: #fff;
                        box-sizing: border-box;
                        height: vw(48);
                        border-radius: 0 50% 50% 0;
                        border-left: 0;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .isvip {
      text-indent: 1em;
      background-color: #fff0b5;
      color: #d6ab00;
      height: vw(54);
      line-height: vw(54);
      font-size: vw(28);
    }
    .push {
      height: vw(88);
      line-height: vw(88);
      text-align: center;
      background-color: #fff;
      .allcheck {
        display: flex;
        padding-left: vw(30);
        span {
          color: #777;
          line-height: vw(88);
        }
      }
      .heji {
        text-align: right;
      }
      .xiadan {
        color: #fff;
        background-color: red;
      }
    }
  }
}
</style>