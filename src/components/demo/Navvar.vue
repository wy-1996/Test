<template>
  <div>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">
        <img src="../../assets/js.png" slot="icon" />
        JavaScript
      </mt-tab-item>
      <mt-tab-item id="2">
        <img src="../../assets/html5.png" slot="icon" />
        HTML5
      </mt-tab-item>
      <mt-tab-item id="3">
        <img src="../../assets/jquery.png" slot="icon" />
        JQuery
      </mt-tab-item>
      <mt-tab-item id="4">
        <img src="../../assets/css3.png" slot="icon" />
        CSS3
      </mt-tab-item>
    </mt-navbar>
    <div>{{active}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
    };
  },
  watch: {
    active() {
      //   console.log(this.active);
    },
  },
};
</script>