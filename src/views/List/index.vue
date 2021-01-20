<template>
  <div id="list">
    <header>
      <div class="headerinner">
        <div class="tool">
          <van-icon name="arrow-left" class="leavebar" @click="goto" />
          <span class="category">{{ this.title }}</span>
        </div>
        <ul class="titles">
          <li
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index === currentpage }"
            @click="flag == 0 ? changepage(index) : changetrangel(index)"
          >
            {{ item }}
            <van-icon
              name="play"
              style="transform: rotate(-90deg)"
              class="trangel"
              v-if="unbind"
            />
            <van-icon
              name="play"
              style="transform: rotate(90deg)"
              class="trangel"
              v-else
            />
          </li>
          <li style="width: 44px" @click="showlist">
            <van-icon name="apps-o" v-if="islist" /><van-icon
              name="wap-nav"
              v-else
            />
          </li>
        </ul>
      </div>
    </header>
    <main>
      <ul class="notlists" v-if="showislist">
        <li
          v-for="(item, index) in lists"
          :key="index"
          @click="gotodetail(item._id)"
        >
          <img v-lazy="item.post" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">
            <span class="newprice" style="color: #da251c"
              >￥{{ item.sale_price }}</span
            >
            <s class="oldprice" style="color: #ccc"
              >￥{{ item.market_price }}</s
            >
          </p>
        </li>
      </ul>
      <ul class="lists" v-else>
        <li v-for="(item, index) in lists" :key="index">
          <img v-lazy="item.post" alt="" />
          <div class="desc">
            <p class="name">{{ item.name }}</p>
            <p class="price">
              <span class="newprice" style="color: #da251c"
                >￥{{ item.sale_price }}</span
              >
              <s class="oldprice" style="color: #ccc"
                >￥{{ item.market_price }}</s
              >
            </p>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import goodsApi from "../../api/goodsApi";
export default {
  data() {
    return {
      title: "",
      listdata: "",
      titles: ["综合", "销量", "价格", "时间"],
      currentpage: 0,
      num: 0,
      unbind: false,
      flag: 0,
      islist: true,
      showislist: true,
      page: 44,
      bookcategory: [
        {
          name: "1",
          title: "小说",
          listdata: "",
        },
        {
          name: "2",
          title: "文学",
          listdata: "",
        },
        {
          name: "3",
          title: "经管",
          listdata: "",
        },
        {
          name: "4",
          title: "历史",
          listdata: "",
        },
        {
          name: "5",
          title: "社科",
          listdata: "",
        },
        {
          name: "6",
          title: "哲学",
          listdata: "",
        },
        {
          name: "7",
          title: "政治",
          listdata: "",
        },
        {
          name: "8",
          title: "法律",
          listdata: "",
        },
        {
          name: "9",
          title: "艺术",
          listdata: "",
        },
        {
          name: "10",
          title: "生活",
          listdata: "",
        },
        {
          name: "11",
          title: "科技",
          listdata: "",
        },
        {
          name: "12",
          title: "考试",
          listdata: "",
        },
      ],
      lists: "",
    };
  },

  components: {},

  methods: {
    changepage(index) {
      this.currentpage = index;
      this.unbind = true;
      // 发送请求
      if (index == 0) {
        goodsApi.getdata(44, 10, {}).then((res) => {
          this.lists = res.data.data;
        });
      } else if (index == 1) {
        // 按销量升序排序
        this.lists = this.lists.sort(this.sortgoods("sale_count", 0));
      } else if (index == 2) {
        //按价格升序
        this.lists = this.lists.sort(this.sortgoods("sale_price", 0));
      } else if (index == 3) {
        //按时间升序排序
        this.lists = this.lists.sort(this.sortgoods("sale_time", 0));
      }
      this.flag++;
    },
    changetrangel(index) {
      this.currentpage = index;
      this.unbind = false;
      if (index == 0) {
        goodsApi.getdata(44, 10, {}).then((res) => {
          this.lists = res.data.data;
        });
      } else if (index == 1) {
        // 按销量降序排序
        this.lists = this.lists.sort(this.sortgoods("sale_count", 1));
      } else if (index == 2) {
        //按价格降序
        this.lists = this.lists.sort(this.sortgoods("sale_price", 1));
      } else if (index == 3 || index == 0) {
        //按时间降序排序
        this.lists = this.lists.sort(this.sortgoods("sale_time", 1));
      }
      this.flag--;
    },
    // 切换列表显示样式
    showlist() {
      this.islist = !this.islist;
      this.showislist = !this.showislist;
    },
    // 对后端返回的数据进行排序
    sortgoods(property, num) {
      if (num == 0) {
        return function (a, b) {
          let value1 = a[property];
          let value2 = b[property];
          // 升序排列
          return value1 - value2;
        };
      } else if (num == 1) {
        return function (a, b) {
          let value1 = a[property];
          let value2 = b[property];
          // 升序排列
          return value2 - value1;
        };
      }
    },
    goto() {
      this.$router.push("/bookcity");
    },
    gotodetail(id) {
      this.$router.push({
        path: "/detail",
        query: { id, forwardpath: this.$route.fullPath,fowardpage:'list' },
      });
    },
  },
  created() {
    //  判断传过来的name是多少就显示相应的页面
    this.bookcategory.forEach((item) => {
      if (this.$route.query.name == item.name) {
        this.title = item.title;
        this.page = item.name * 1 + 43;
        goodsApi.getdata(this.page, 10, {}).then(async (res) => {
          item.listdata = res.data.data;
          localStorage.setItem("lists", JSON.stringify(item.listdata));
          this.lists = JSON.parse(localStorage.getItem("lists"));
        });
      }
      return;
    });
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
#list {
  overflow: auto;
  header {
    width: 100%;
    height: vw(180);
    position: relative;
    .headerinner {
      width: 100%;
      position: fixed;
      background: white;
    }
    .tool {
      width: 100%;
      height: vw(88);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid #f9f9f9;
      .leavebar {
        margin-left: vw(30);
      }
      .category {
        margin-right: 43%;
      }
    }
    .titles {
      width: 100%;
      height: vw(88);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid#f9f9f9;
      li {
        width: vw(160);
        height: 100%;
        line-height: vw(88);
        text-align: center;
        color: #989898;
        font-size: 14px;
        .trangel {
          transform-origin: center center;
          display: none;
        }
        &:hover .trangel {
          display: inline-block;
        }
      }
      .active {
        color: #da251c;
      }
    }
  }
  main {
    padding: vw(30);
    .notlists {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: vw(330);
        margin-bottom: vw(30);
        img {
          width: vw(330);
          height: vw(330);
        }
        p {
          margin: vw(10) 0;
          font-size: 14px;
        }
        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .lists {
      width: 100%;
      li {
        width: vw(330);
        margin-bottom: vw(30);
        display: flex;
        img {
          width: vw(212);
          height: vw(212);
        }
        p {
          margin: vw(10) 0;
          font-size: 14px;
        }
        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>