<template>
  <div class="cart-list">
    <CartListItem
      v-for="(item) in cartList"
      :key="item.iid"
      :itemInfo='item'
    ></CartListItem>
  </div>
</template>

<script>
import CartListItem from "./cartlistitem.vue";
export default {
  name: "CartList",
  created() {
    this.cartList = this.$store.state.cartList;
  },
  data() {
    return {
      cartList: [],
    };
  },
  components: {
    CartListItem,
  },
};
</script>

<style>
</style>