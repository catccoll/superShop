<template>
  <div class="wrapper" ref="aaa">
    <ul class="context">
      <li>1</li>
      <li @click="btnclick">2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>

    </ul>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Category",
    data() {
    return {
      bscroll: null,
    };
  },
  mounted() {
    this.bscroll = new Bscroll(this.$refs.aaa, {
      // 0,1都是不侦测位置,2是检测位置的变化，但是鼠标脱离了就不变化，3是即使鼠标变化了，他也会变化位置
      probeType: 3,
      click: true, //设置为ture，就可以监听里面的事件
      pullUpLoad: true, //设置上拉加载更多
      observeDOM:true
    });
    this.bscroll.on("scroll", function (position) {
      console.log(position);
    });
    this.bscroll.on("pullingUp", () => {
  console.log(111111111111111111111111111111111111111111111111111);
      // 1.发送网络请求，请求更多页的数据
      // 2.等数据完成后，并且将新的数据展示出来
      setTimeout(() => {
      
     this.bscroll.finishPullUp();
      }, 2000);
      
    });
  },


  methods:{
    btnclick(){
      console.log(11);
    }
  }
};
</script>

<style>
.wrapper {
  height: 150px;
  background-color: red;
}
</style>