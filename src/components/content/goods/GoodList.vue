<template>
  <div class="GoodList" >
    <GoodsListItem v-for="item in goodlist" :key="item.iid" :goodsItem="item"     />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodList",
  components: {
    GoodsListItem,
  },
  props: {
    goodlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
  
  }
};
</script>

<style scoped>
.GoodList{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>