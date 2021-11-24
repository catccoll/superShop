<template>
<div class="detailswiper">
 <Swiper >
     <SwiperItem  class="swiper-item" v-for="item in topImg" :key='item'>
         <img :src="item" alt="">
     </SwiperItem>
 </Swiper>
</div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "childSwiper",
  props: {
    topImg: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    SwiperItem,
    Swiper,
  },
};
</script>

<style scoped>
.swiper-item{
 height: 300px;
  overflow: hidden;
  
}
img{
  width: 100%;
}
</style>