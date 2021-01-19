<template>
  <div id="detail">
    <header>
      <div class="tool"><span></span><span></span></div>
    </header>
    <nav><img src="" alt="" /></nav>
    <main>
      <div class="priceAnddescrib">
        <div class="priceArea">
          <p class="newprice"><span>￥36.96</span><span>VIP￥35.70</span></p>
          <p class="oldprice">
            <s>42.00</s>
            <span>开通VIP会员，享受更多折扣</span>
          </p>
          <div class="title">半小时漫画科学史</div>
          <p>正版保证</p>
          <p class="readpel">
            浏览次数 <span class="readnum">163</span> 销量<span class="sale"
              >15</span
            >
          </p>
        </div>
      </div>
      <div class="shopArea">
        <div class="shop">
          <img src="" alt="" />
          <div class="phone"><span>浙江仓</span><span>0755-82460842</span></div>
          <div class="shopbar">
            <span>全部宝贝</span>
            <span>进店逛逛</span>
          </div>
        </div>
        <p class="advertisement">广告</p>
      </div>
      <div class="recommendArea">
        <section class="clumn pinpai">
          <p class="new"><span>商家推荐</span><span>更多</span></p>
          <!-- <ul>
          <li
            v-for="item in recommandbook"
            :key="item._id"
            @click="forDetail(item._id)"
          >
            <img :src="item.s_imgUrl ? item.s_imgUrl : defaultimg" alt="" />
            <p class="title">{{ item.s_name }}</p>
          </li>
        </ul> -->
        </section>
      </div>
      <div class="intruduce">
        <van-tabs v-model="active">
          <van-tab title="图文介绍">
            <p><span>作者</span><span>xxx</span></p>
            <p><span>国际标准书号ISBN</span><span>xxx</span></p>
            <p><span>出版社</span><span>xxx</span></p>
            <p><span>出版时间</span><span>xxx</span></p>
            <p><span>开本</span><span>xxx</span></p>
          </van-tab>
          <van-tab title="问答">
            <p><van-icon name="question-o" />有什么疑问，问问卖家吧</p>
            <button>问问卖家</button>
          </van-tab>
        </van-tabs>
      </div>
    </main>
    <footer>
        <ul>
            <li><van-icon name="service-o" /><span>客服</span></li>
            <li><van-icon name="like" /></li>
            <button class="buynow">立即购买</button>
            <button class="addtocart">加入购物车</button>
        </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
    };
  },

  components: {},

  methods: {},
};
</script>

<style scoped>
</style>