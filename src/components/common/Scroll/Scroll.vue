<template>
  <div class="wrapper" ref="wrapper1">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll, { PullUpLoad } from "better-scroll";
Bscroll.use(PullUpLoad);
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 创建Bscroll对象
    this.Bscroll = new Bscroll(this.$refs.wrapper1, {
      probeType: this.probeType, //probe侦探的意思
      click: true,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
    });
    // 2.监听滚动的位置
    this.Bscroll.on("scroll", (position) => {
   
      this.$emit("scroll", position);
    });
    // 3.监听上拉事件
    this.Bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  data() {
    return {
      Bscroll: null,
    };
  },
  methods: {
    finishPullUp() {
  this.Bscroll.finishPullUp();
    },
  },
  // scrollTo(x, y, time = 300) {
  //   this.Bscroll && this.Bscroll.scrollTo(x, y, time);
  // },
    refresh() {
       this.Bscroll.refresh()
      },
};
</script>

<style>
</style>