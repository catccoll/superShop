<template>
  <div class="tabControl">
    <div v-for="(item, index) in title" :key="item" @click="btnclick(index)">
      <span :class="{ isred: index == currendIndex }">{{ item }} </span>
    </div>
  </div>
  <!-- 当组件想要复用时，且只有文字内容不一样，不必去预留插槽 -->
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currendIndex: 0,
    };
  },
  methods: {
    btnclick(index) {
      this.currendIndex = index;
      this.$emit("typebtn", index);
    },
  },
};
</script>

<style scoped>
.tabControl {
  display: flex;
  font-size: 15px;
}
.tabControl div {
  flex: 1;
  text-align: center;
  line-height: 40px;
  height: 40px;
}
.tabControl div span {
  padding-bottom: 8px;
}
.isred {
  border-bottom: 2px solid var(--color-high-text);
  color: var(--color-high-text);
}
</style>