<template>
  <div id="app">
    <!-- 把Detail组件失活 -->
   <keep-alive exclude="Detail"> <router-view /></keep-alive >
    <mainTabBar></mainTabBar>
  </div>
</template>
<script>
import mainTabBar from "components/content/mainTabBar.vue";
export default {
  name: "app",
  components: {
    mainTabBar,
  },
};
</script>
<style scoped>
@import  "assets/css/base.css";
</style>
