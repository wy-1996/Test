<template>
  <div>
    <div>
      <mt-tab-container v-model="selectedTab">
        <mt-tab-container-item id="home">
          <p v-for="(v,k) of 50" :key="k">首页内容{{v}}</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="cart">
          <p v-for="(v,k) of 50" :key="k">购物车内容{{v}}</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="center">
          <p v-for="(v,k) of 50" :key="k">个人中心内容{{v}}</p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div>
      <mt-tabbar v-model="selectedTab" fixed>
        <mt-tab-item id="home">
          首页
          <img src="../../assets/home_enable.png" slot="icon" v-if="selectedTab=='home'" />
          <img src="../../assets/home_disable.png" slot="icon" v-else />
        </mt-tab-item>
        <mt-tab-item id="cart">
          购物车
          <img src="../../assets/cart_enable.png" slot="icon" v-if="selectedTab=='cart'" />
          <img src="../../assets/cart_disable.png" slot="icon" v-else />
        </mt-tab-item>
        <mt-tab-item id="center">
          个人中心
          <img src="../../assets/me_enable.png" slot="icon" v-if="selectedTab=='center'" />
          <img src="../../assets/me_disable.png" slot="icon" v-else />
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTab: "home",
    };
  },
};
</script>