<template>
  <NavBar>
    <div slot="left" class="left" @click="backclick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="center">
      <div
        v-for="(item, index) in title"
        :key="item"
        @click="titleclick(index)"
        :class="{ beau: currendIndex == index }"
      >
        {{ item }}
      </div>
    </div></NavBar
  >
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "childNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currendIndex: 0,
    };
  },
  methods: {
    titleclick(index) {
      this.currendIndex = index;
      this.$emit('sclick',index)
    },
    backclick(){
        // back=go(-1)
        this.$router.back()
    }
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: space-around;
}
.beau {
  color: var(--color-high-text);
}
.left {
  margin-top: 5px;
}
</style>