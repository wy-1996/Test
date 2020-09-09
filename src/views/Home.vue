<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="学前端，到学问">
      <div slot="right" class="shortcut">
        <router-link to="/field">注册</router-link>
        <router-link to="/reg">登录</router-link>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item
        :id="item.id"
        v-for="(item,index) of category"
        :key="index"
      >{{item.category_name}}</mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <div class="panel" infinite-scroll-distance="10" v-infinite-scroll="loadMore">
      <mt-tab-container v-model="active">
        <mt-tab-container-item :id="item.id" v-for="(item,index) of category" :key="index">
          <!-- 单一文章信息开始 -->
          <div class="InfoItem" v-for="(article,index) of articles" :key="index">
            <!-- 标题信息开始 -->
            <div class="InfoItemHead">{{article.subject}}</div>
            <!-- 标题信息结束 -->
            <!-- 简介与缩略图容器开始 -->
            <div class="InfoItemContent">
              <!-- 简介开始 -->
              <div class="InfoItemDes">{{article.description}}</div>
              <img v-lazy="article.image" class="InfoItemImg-s" v-if="article.image!=null" />
              <!-- 简介结束 -->
            </div>
            <!-- 简介与缩略图容器结束 -->
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- 单二文章信息开始 -->
          <div class="InfoItem"></div>
          <!-- 单二文章信息结束 -->
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!-- 单三文章信息开始 -->
          <div class="InfoItem"></div>
          <!-- 单三文章信息结束 -->
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <!-- 单四文章信息开始 -->
          <div class="InfoItem"></div>
          <!-- 单四文章信息结束 -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!-- 面板区域结束 -->
    <!-- 底部选项卡开始 -->
    <div>
      <mt-tabbar v-model="selectedTab" fixed>
        <mt-tab-item id="home">
          首页
          <img src="../assets/home_enable.png" slot="icon" v-if="selectedTab=='home'" />
          <img src="../assets/home_disable.png" slot="icon" v-else />
        </mt-tab-item>
        <mt-tab-item id="cart">
          购物车
          <img src="../assets/cart_enable.png" slot="icon" v-if="selectedTab=='cart'" />
          <img src="../assets/cart_disable.png" slot="icon" v-else />
        </mt-tab-item>
        <mt-tab-item id="center">
          个人中心
          <img src="../assets/me_enable.png" slot="icon" v-if="selectedTab=='center'" />
          <img src="../assets/me_disable.png" slot="icon" v-else />
        </mt-tab-item>
      </mt-tabbar>
    </div>

    <!-- 底部选项卡结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 默认被选定的顶部选项卡的ID
      active: 1,
      // 默认被寻鼎的顶部选项卡
      selectedTab: "home",
      category: [],
      // 存储文章数据
      articles: [],
      // 存储当前页码
      page: 20,
      // 存储服务器返回的总页数
      pagecount: 0,
    };
  },
  methods: {
    // 向下滚动时触发的加载更多数据的函数
    loadMore() {
      // 页码累加
      this.page++;
      //获取指当前分类下的第几页的数据
      this.axios
        .get("/articles?cid=" + this.active + "&page=" + this.page)
        .then((res) => {
          // 将服务器返回的总页数存储到pagecount变量中
          this.pagecount = res.data.pagecount;
          let data = res.data.articles;
          data.forEach((item) => {
            if (item.image != null) {
              item.image = require("../assets/articles/" + item.image);
            }
            this.articles.push(item);
          });
        });
    },
  },
  watch: {
    // 监听顶部选项卡的变化

    active() {
      this.page = 1;
      // 切换顶部选项卡时，清空之前存储的文章数据
      this.articles = [];
      // 切换顶部选项卡时，页码初始值为1
      this.axios
        .get(`/articles?cid=` + this.active + "&page=" + this.page)
        .then((res) => {
          // 将服务器返回的总页数存储到pagecount变量中
          this.pagecount = res.data.pagecount;
          let data = res.data.articles;
          data.forEach((item) => {
            if (item.image != null) {
              item.image = require("../assets/articles/" + item.image);
            }
            this.articles.push(item);
          });
        });
    },
    // 监听底部选项卡的变化
    selectedTab() {
      switch (this.selectedTab) {
        case "home":
          this.$router.push("/");
          break;
        case "cart":
          this.$router.push("/list");
          break;
        case "center":
          this.$router.push("/navvar");
          break;
      }
    },
  },
  //在挂载后发送请求，以获得web服务器的数据
  mounted() {
    // 获取文章分类信息--决定顶部选项卡
    this.axios.get("/category").then((res) => {
      // console.log(results);
      this.category = res.data.results;
    });
    // 获取默认顶部选项卡包含的文章列表
    // 之所以传递参数，是因为现在客户端
    // 只获取特定分类下包含的文章数据，所有通过参数来告知服务器
    this.axios
      .get(`/articles?cid=${this.active}&page=${this.page}`)
      .then((res) => {
        console.log(res);
        // 将服务器返回的总页数存储到pagecount变量中
        this.pagecount = res.data.pagecount;
        // 将服务器返回的文章数据存储到articles变量中
        let data = res.data.articles;
        // 循环动态加载图像
        data.forEach((item) => {
          // 因为有的文章没有图像，所以无需动态加载图像了
          // 故进行判断操作
          if (item.image != null) {
            // 属性重新赋值
            // 动态加载图像，此时item中id，subject,description没有发生任何变化
            // 但是图像已经成为了动态加载的图像了
            // 所以现在只能依次将最新的item添加到articles变量中了
            item.image = require("../assets/articles/" + item.image);
          }
          this.articles.push(item);
        });
      });
  },
};
</script>
<style scoped>
/* 顶部导航栏右侧的连接 */
.shortcut a {
  color: #fff;
  text-decoration: none;
  margin-left: 10px;
}
/* 面板容器 */
.panel {
  margin-top: 10px;
  margin-bottom: 60px;
}
/* 单一文章信息容器 */
.InfoItem {
  padding: 15px 0 14px;
  margin: 0 15px;
  border-bottom: 0.5px solid #d3d3d3;
}
/* 文章的标题信息 */
.InfoItemHead {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
/* 简介与缩略图容器 */
.InfoItemContent {
  display: -ms-flexbox;
  display: flex;
  padding-top: 11px;
  -ms-flex-align: center;
  align-items: center;
  widows: 100%;
}
/* 简介 */
.InfoItemDes {
  flex: 1;
  position: relative;
  -webkit-line-clamp: 3;
  height: 63px;
  padding-right: 15px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
  margin-right: 4px 15px;
  -webkit-box-orient: vertical;
}
.InfoItemImg-s {
  width: 112px;
  height: 74px;
  border-radius: 5px;
  background: #ccc;
}
</style>
