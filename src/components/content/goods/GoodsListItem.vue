<template>
  <div class="goods-item" @click='img1click'  >
    <img v-lazy="showImage" alt=""  @load="imgonload"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{//当传入这个组件用到同样的信息， 但是他们取到信息的格式不同的时候，就会发生分歧，其中一个取得到，一个取不到，那么我们就可以搞一个计算属性，来做相应的区分，反正只要我们要操作DOM里面的属性的时候，我们就可以搞一个计算属性 记得  计算属性真的很重要
    showImage(){
      return this.goodsItem.show?this.goodsItem.show.img:this.goodsItem.image
    }
  },
  methods:{
    imgonload(){
     this.$bus.$emit("imgonload")
    },
      img1click(){
    this.$router.push('/detail/'+this.goodsItem.iid)
  }
  },

};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>