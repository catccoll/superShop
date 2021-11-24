<template>
  <div id="toast" v-show="isshow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isshow: false
    };
  },
  methods: {
    show(message, duration=2000) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
#toast {
  position: fixed;
  z-index: 100000000000000000000000000000000000000000;
  left: 50%;
  top: 50%;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.6);
  transform: translate(-50%, -50%);
}
</style>