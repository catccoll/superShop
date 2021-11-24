<template>
  <div class="detail">
    <!-- <div v-if="0 === currendIndex"> -->
    <!-- 导航栏 -->
    <childNavBar
      class="navbar"
      @sclick="sclick"
      ref="childNavBar"
    ></childNavBar>
    <Scroll :pullUpLoad="true" :probeType="3" class="content" ref="scroll">
      <childSwiper :topImg="topImg"></childSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo
        :paramInfo="paramInfo"
        ref="DetailGoodsInfo"
      ></DetailParamInfo>
      <DetailCommentInfo
        :commentInfo="commentInfo"
        ref="DetailCommentInfo"
      ></DetailCommentInfo>
      <GoodList :goodlist="recommend" ref="GoodList"></GoodList>
 
    </Scroll>
          
    <DetailBottomBar @addCart="addCart"></DetailBottomBar>
    <BackTop
      class="BackTop"
      @click.native="showclick"
      v-show="isShow"
    ></BackTop>
  
  </div>
  <!-- <div v-else-if="1 == currendIndex"><DetailGoodsInfo></DetailGoodsInfo></div> -->
  <!-- </div> -->
</template>

<script>
import childNavBar from "./childcomponents/childnavbar.vue";
import childSwiper from "./childcomponents/childswiper.vue";
import DetailBaseInfo from "./childcomponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childcomponents/DetailShopInfo.vue";
import DetailParamInfo from "./childcomponents/DetailParamInfo.vue";
import DetailGoodsInfo from "./childcomponents/DetailGoodsInfo.vue";
import DetailCommentInfo from "./childcomponents/DetailCommentInfo.vue";
import DetailBottomBar from "./childcomponents/DetailbottomBar.vue";
import GoodList from "components/content/goods/GoodList.vue";
import BackTop from "components/common/backTop/backTop.vue";
import Scroll from "components/common/Scroll/Scroll";
import Toast from "components/common/Toast/Toast";
import { itemListenerMixin } from "common/mixin.js";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import {mapActions} from 'vuex'
export default {
  name: "Detail",
  created() {
    //   保存传入j进来的iid
    this.iid = this.$route.params.iid;
    // 请求数据
    getDetail(this.iid).then((res) => {
      // 获取数据不要一下子获取，要分离，抽取我们想要的数据，但是当想要的数据非常多的话，可以创造一个类，整理数据
      // 1.获取轮播图片
      const data = res.result;
      this.topImg = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImgListen: null,
      currendIndex: 0,
      themeTops: [0, ],
      isShow: false,
      message:'',
      show:null,
    };
  },
  components: {
    childNavBar,
    childSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    Scroll,
    GoodList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  methods: {
    sclick(index) {
      let y = this.themeTops[index];
      this.$refs.scroll.Bscroll.scrollTo(0, -y, 1000);
    },
    // 监听图片的事件
    imageLoad() {
      this.$refs.scroll.Bscroll.refresh();
      this.themeTops[1] = this.$refs.DetailGoodsInfo.$el.offsetTop;
      this.themeTops[2] = this.$refs.DetailCommentInfo.$el.offsetTop;
      this.themeTops[3] = this.$refs.GoodList.$el.offsetTop;
    },
    // 返回到top的事件
    showclick() {
      this.$refs.scroll.Bscroll.scrollTo(0, 0, 1000);
    },
    ...mapActions(['addCart1']),
    // 添加购物车事件
    addCart() {
      // 1.获取所需要的信息
      const product = {};
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
   
      // 2.将商品加入vuex当中,这里用到actions中可以返回一个promise，要掌握，还有mapActions的映射关系
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })
      this.addCart1(product).then(res=>{
        //  this.message=res
        //  this.show=true
        //  setTimeout(()=>{
        //    this.show=false
        //  },3000)
        this.$toast.show(res,2000)
      })
    },
  },
  mounted() {
    // 这个是联动事件
    this.$refs.scroll.Bscroll.on("scroll", (position) => {
      this.isShow = -position.y >= 3000;
      for (let i in this.themeTops) {
        if (this.themeTops[i] <= -position.y) {
          this.$refs.childNavBar.currendIndex = i;
        }
      }
    });
  },
};
</script>

<style scoped>
.detail {
  z-index: 1000000000;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 100000000;
  background: #fff;
}
.BackTop {
  z-index: 1000000000;
}
</style>
// const obj={}
// Object.keys(obj).length===0
// 这样可以判断obj是否为空对象