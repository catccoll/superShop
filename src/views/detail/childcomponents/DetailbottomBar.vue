<template>
  <div class="bottomBar">
    <div class="bar-item bar-left">
      <div><i class="icon service"></i><span class="text">客服</span></div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div><i class="icon select"></i><span class="text">收藏</span></div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
  this.$emit("addCart")
    },
  },
};
</script>

<style scoped>
.bottomBar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000000000;
  background: white;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: l;
  display: flex;
}

.bar-item > div {
  flex: 1;
}
.bar-left {
  flex: 2;
}
.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: ur1("~assets/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
  flex: 2;
  display: flex;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
  flex: 1;
}
.bar-right .buy {
  background-color: #f69;
  flex: 1;
}
.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}
</style>