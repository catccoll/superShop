<template>
  <div class="shopcart">
    <NavBar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </NavBar>
    <Scroll :probeType="3" :pullUpLoad="true" class="content">
      <!-- 商品的列表 -->
      <CartList></CartList>
 
    </Scroll>
    <CartButtonBar  ></CartButtonBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/Scroll/Scroll";
import CartList from "./childcomponents/CartList.vue";
import CartButtonBar from './childcomponents/CartButtonBar.vue'

import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartButtonBar
  },
  // 这里是新鲜的语法 ，可以掌握
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength']),
    // 当你想改函数的名字时
    ...mapGetters({
      length: "cartLength",
    }),
  },

};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}
</style>