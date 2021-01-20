<template>
  <div id="bookcity">
    <header>
      <div class="inner">
        <search></search>
        <!-- title部分 -->
        <van-tabs v-model="active" @click="gotolist">
          <van-tab
            :title="item.title"
            v-for="(item, index) in titles"
            :key="index"
          >
          </van-tab>
        </van-tabs>
      </div>
    </header>
    <main>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            v-lazy="image ? image : defaultimg"
            width="100%"
            height="168"
            style="display: block"
          />
        </van-swipe-item>
      </van-swipe>
      <ul class="catg">
        <li>
          <span> <img src="../../../public/image/textbook.jpg" alt="" /></span
          ><span>教材教辅</span>
        </li>
        <li>
          <span> <img src="../../../public/image/magicbook.jpg" alt="" /></span
          ><span>童书堡</span>
        </li>
        <li>
          <span> <img src="../../../public/image/oldenglish.jpg" alt="" /></span
          ><span>英文原版</span>
        </li>
        <li>
          <span> <img src="../../../public/image/team.jpg" alt="" /></span
          ><span>团购精选</span>
        </li>
        <li>
          <span> <img src="../../../public/image/electronic.jpg" alt="" /></span
          ><span>电子书</span>
        </li>
      </ul>
      <!-- 新品尝鲜 -->
      <section class="clumn">
        <p class="new"><span>新品尝鲜</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in newtast"
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
      <!-- 新书推荐 -->
      <section class="clumn">
        <p class="new"><span>新书推荐</span></p>
        <ul class="recommand">
          <img src="../../../public/image/banner7.jpg" alt="" />
        </ul>
      </section>
      <!-- 畅销图书 -->
      <section class="clumn">
        <p class="new"><span>畅销图书</span><span>更多</span></p>
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
      <!-- 童书活动专区 -->
      <section class="clumn">
        <p class="new"><span>童书活动专区</span></p>
        <ul class="recommand">
          <img src="../../../public/image/children.jpg" alt="" />
        </ul>
      </section>
      <!-- 2021杂志征订 -->
      <section class="clumn">
        <p class="new"><span>2021杂志征订</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in zazhi"
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
      <!-- 原版书 -->
      <section class="clumn">
        <p class="new"><span>原版书</span></p>
        <ul class="recommand">
          <img src="../../../public/image/banner4.jpg" alt="" />
        </ul>
      </section>
      <!-- 精选原版图书 -->
      <section class="clumn">
        <p class="new"><span>精选原版图书</span><span>更多</span></p>
        <ul>
          <li v-for="item in real" :key="item._id" @click="forDetail(item._id)">
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
      <!-- 童书推荐 -->
      <section class="clumn">
        <p class="new"><span>童书推荐</span></p>
        <ul class="recommand">
          <img src="../../../public/image/newchildrenbook.jpg" alt="" />
        </ul>
      </section>
      <!-- 精选童书 -->
      <section class="clumn">
        <p class="new"><span>精选童书</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in tongshu"
            :key="item._id"
            @click="forDetail(item._id)"
          >
            <img :src="item.s_imgUrl" alt="" />
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
      <!-- 好书推荐 -->
      <section class="clumn">
        <p class="new"><span>好书推荐</span></p>
        <ul class="recommand">
          <img src="../../../public/image/banner6.jpg" alt="" />
        </ul>
      </section>
      <!-- 文学精品 -->
      <section class="clumn wenxue">
        <p class="new"><span>文学精品</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in goodbook"
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
      <!-- 人气单品 -->
      <section class="clumn">
        <p class="new"><span>人气单品</span></p>
        <ul class="recommand">
          <img src="../../../public/image/banner5.jpg" alt="" />
        </ul>
      </section>
      <!-- 经管读物 -->
      <section class="clumn">
        <p class="new"><span>经管读物</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in ecnomicbook"
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
      <!-- 故宫解密游戏书 -->
      <section class="clumn">
        <p class="new"><span>故宫解密游戏书</span></p>
        <ul class="recommand">
          <img src="../../../public/image/jiemi.jpg" alt="" />
        </ul>
      </section>
      <!-- 推荐品牌 -->
      <section class="clumn pinpai">
        <p class="new"><span>推荐品牌</span><span>更多</span></p>
        <ul>
          <li
            v-for="item in recommandbook"
            :key="item._id"
            @click="forDetail(item._id)"
          >
            <img :src="item.s_imgUrl ? item.s_imgUrl : defaultimg" alt="" />
            <p class="title">{{ item.s_name }}</p>
          </li>
        </ul>
      </section>
      <!-- 公益广告 -->
      <section class="clumn">
        <p class="new"><span>公益广告</span></p>
        <ul class="recommand">
          <img src="../../../public/image/lovecondition.jpg" alt="" />
        </ul>
      </section>
      <!-- 猜你喜欢 -->
      <section class="clumn">
        <p class="new"><span>猜你喜欢</span><span>更多</span></p>
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
    </main>
    <toolbar></toolbar>
  </div>
</template>

<script>
import search from "../../component/search";
import toolbar from "../../component/toolbar";
import banner1 from "../../../public/image/banner1.jpg";
import banner2 from "../../../public/image/banner2.jpg";
import banner3 from "../../../public/image/banner3.jpg";
import banner4 from "../../../public/image/banner4.jpg";
import banner5 from "../../../public/image/banner5.jpg";
import banner6 from "../../../public/image/banner6.jpg";
import banner7 from "../../../public/image/banner7.jpg";
// import defaultimg from "../../../public/image/default_000.jpg";
//引入goodsapi
import goodsApi from "../../api/goodsApi";
export default {
  data() {
    return {
      value: "",
      active: 0,
      titles: [
        { title: "推荐" },
        { title: "小说" },
        { title: "文学" },
        { title: "经管" },
        { title: "历史" },
        { title: "社科" },
        { title: "哲学" },
        { title: "政治" },
        { title: "法律" },
        { title: "艺术" },
        { title: "生活" },
        { title: "科技" },
        { title: "考试" },
      ],
      images: [banner1, banner2, banner3, banner4, banner5, banner6, banner7],
      magicpage: "",
      newtast: "",
      goodsale: "",
      zazhi: "",
      real: "",
      tongshu: "",
      goodbook: "",
      ecnomicbook: "",
      recommandbook: "",
      show: false,
    };
  },

  components: {
    search,
    toolbar,
  },

  methods: {
    fetch() {
      goodsApi.getdata(3, 150).then((res) => {
        this.newtast = res.data.data.filter((item) => item.f_id == 556);
        this.goodsale = res.data.data.filter((item) => item.f_id == 557);
        this.zazhi = res.data.data.filter((item) => item.f_id == 1551);
        this.real = res.data.data.filter((item) => item.f_id == 1607);
        this.tongshu = res.data.data.filter((item) => item.f_id == 135);
        this.goodbook = res.data.data
          .filter((item) => item.f_id == 1584)
          .slice(0, 4);
        this.ecnomicbook = res.data.data.filter((item) => item.f_id == 1586);
        this.recommandbook = res.data.data.filter((item) => item.f_id == 198);
      });
    },
    // 点击跳转到详情页
    forDetail(id) {
      this.$router.push({
        path: "/detail",
        query: { id, forwardpath: this.$route.fullPath,fowardpage:'bookcity' },
      });
    },
    //点击去列表页
    gotolist(name, title) {
      if (name != 0) {
        this.$router.push({ path: "/list", query: { name } });
      }
    },
  },
  created() {
    this.fetch();
  },
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
  header {
    width: 100%;
    height: vw(204);
    position: relative;
    .inner {
      width: 100%;
      height: vw(204);
      position: fixed;
      z-index: 2;
    }
  }
  main {
    flex: 1;
    background: #f8f8f8;
    // 轮播图
    .van-swipe {
      .van-swipe-item {
        background: url(../../../public/image/default_000.jpg) no-repeat;
        background-size: 100% 100%;
      }
    }
    .catg {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: vw(40) 0;
      background: white;
      margin-bottom: vw(8);
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 14px;
        }
        img {
          width: vw(92);
          height: vw(92);
          border-radius: 50%;
          margin: vw(20) 0;
        }
      }
    }
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
        overflow-x: auto;
        li {
          display: flex;
          flex-direction: column;
          padding: 0 vw(20);
          img {
            width: vw(180);
            height: vw(180);
            background: url(../../../public/image/default_000.jpg) no-repeat;
            background-size: 100%;
          }
          .title {
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
      .recommand {
        img {
          width: 100%;
          height: vw(326);
          padding: 0 0 vw(20) 0;
        }
      }
    }
    .wenxue {
      ul {
        flex-wrap: wrap;
        li {
          padding: 0 vw(2);
          img {
            width: vw(338);
            height: vw(338);
          }
          .title {
            width: vw(338);
          }
        }
      }
    }
    .pinpai {
      ul {
        li {
          align-items: center;
          img {
            width: vw(90);
            height: vw(80);
          }
        }
      }
    }
  }
}
</style>