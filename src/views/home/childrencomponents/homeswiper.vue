<template>
  <Swiper>
    <SwiperItem v-for="item in banner" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isload: false,
    };
  },
  props: {
    banner: {
      type: Array,
      required: true,
    },
  },
  methods: {
    imgload() {//这里的目的是让他只发送一次事件，用一个标识符，优化
      if (!this.isload) {
        this.$emit("swiperload");
        this.isload = true;
      }
    },
  },
};
</script>

<style>
</style>