<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.sort" class="d1">
      <a :href="item.link">
        <img :src="item.image"/>
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee;
}
.d1 {
  flex: 1;
  justify-content: center;
  text-align: center;
  font-size: 12px;
}
  .recommend .d1 img {
  width: 65px;
  height: 65px;
  vertical-align: middle;
  margin-bottom: 5px;
}
</style>