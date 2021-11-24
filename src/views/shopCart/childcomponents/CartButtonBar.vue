<template>
  <div class="bottonBar">
    <div class="checked">
      <CheckButton
        class="checkbutton"
        :isChecked="isSelectAll"
        @click.native="selectorAll"
        ref="CheckButton"
      >
      </CheckButton>
      <span>全选</span>
    </div>
    <div class="total">合计：{{ totalPrice }}</div>
    <div class="calculate">
      <span>去计算({{ checklength }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton.vue";
export default {
  name: "CartButtonBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      // 这里是用高阶函数做的  很棒
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + parseInt(item.price) * parseInt(item.count);
        }, 0)
        .toFixed(2);
    },
    checklength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },

    isSelectAll() {
      // 这个语法太牛逼 了  要掌握呀
      //  return !(this.$store.state.cartList.filter(item=>{
      //      return !item.checked
      //  }).length)

      // return !this.$store.state.cartList.find((item)=>{
      //     !item.checked
      // })
      if (this.$store.state.cartList.length === 0) return false;
      return (
        this.$store.state.cartList.filter((item) => {
          return item.checked;
        }).length === this.$store.state.cartList.length
      );
    },
  },
  methods: {
    selectorAll() {
      // this.$refs.CheckButton.isChecked = !this.$refs.CheckButton.isChecked;
   
      //   for (let item of this.$store.state.cartList) {
      //    if(this.$refs.CheckButton.isChecked){
      //        item.checked=true
      //    }else{
      //        item.checked=false
      //    }
      //   }
      console.log(this.$store.state.cartList);
      if(this.isSelectAll){
        //这里写的原因是全部不选中 ，isselectall也会不选中
        this.$store.state.cartList.forEach(element => {element.checked=false         
        });
      }else{
           this.$store.state.cartList.forEach(element => {element.checked=true  
        });
      }
    },
  },
};
</script>

<style scoped>
.bottonBar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 40px;
  background-color: #eee;
  display: flex;
  font-size: 18px;
  align-items: center;
}
.checkbutton {
  display: flex;
  width: 22px;
  height: 22px;
}
.checked {
  display: flex;
  margin-top: 7px;
  padding-left: 10px;
}
.checked span {
  margin-left: 15px;
}
.total {
  margin-left: 60px;
  margin-top: 6px;
}
.calculate {
  width: 100px;
  height: 100%;
  background-color: red;
  margin-left: 30px;
  text-align: center;
  line-height: 40px;
}
</style>