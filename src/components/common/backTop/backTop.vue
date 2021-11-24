<template>
  <div class="backTop" @click="backclick">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
name:'backTop',
methods:{
  backclick(){
  
  }
}
}
</script>

<style>
.backTop{
  z-index: 100;
  position: fixed;
  right: 10px;
  bottom: 60px;

}
.backTop img{
  width: 50px;

}
</style>