<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl
      :title="['流行', '新款', '精选']"
     @typebtn="typebtn"
      v-show="tabisshow"
      class="tabContrl"
      ref="tabcontrol1"
    />
    <!-- 当probeType前面不加冒号时，3默认传过去的类型就会是字符串，但是加了冒号，他会以数字类型传过去，但是传过去的类型必须是数字，所以这里要加冒号，当传过去的类型不需要是数字类型，就不用加冒号 -->
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="scroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <HomeSwiper :banner="banner" @swiperload="swiperload"></HomeSwiper>
      <HomeRecommendView :recommend="recommend"></HomeRecommendView>
      <FeatureView></FeatureView>
      <TabControl
        :title="['流行', '新款', '精选']"
        ref="tabcontrol"
       @typebtn="typebtn"
      />
      <GoodList :goodlist="showGoods" />
    </Scroll>
    <BackTop @click.native="backclick" v-show="isshow"></BackTop>
    <!-- 想要在组件里面监听事件，就需要加入修饰符native -->
    <!-- ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象，可以访问组件里面的任何数据和方法，
  如果ref绑定的实在普通元素中，那么通过this.$refs.refname获取到的是一个元素的对象
   -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "views/home/childrencomponents/homeswiper";
import HomeRecommendView from "../home/childrencomponents/HomeRecommendView.vue";
import FeatureView from "./childrencomponents/FeatureView.vue";
import TabControl from "components/content/tabControl/tabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import Scroll from "components/common/Scroll/Scroll";
import BackTop from "components/common/backTop/backTop.vue";
import { itemListenerMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      arr: ["pop", "new", "sell"],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isshow: false,
      taboffsettop: 0,
      // isFixed: false,
      tabisshow: false,
      saveY: 0,
      itemImgListen: null,
    };
  },
  // 生命钩子里面的代码尽量简介，且具体的代码函数都写在方法里面，生命钩子里面就是具体的使用方法的函数
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // mounted() {
  // 1.监听图片加载完成
  //  mixins:[]
  //2. 获取tabcontrol的offsettop值
  // 所有的组件都有一个属性$el:用于获取组件中的元素,但是这里的offsettop获取的值不包括图片的高度
  // },
  mounted() {
    this.itemImgListen = function () {
      this.$refs.scroll.Bscroll.refresh();
    };
    this.$bus.$on("imgonload", () => {
      this.itemImgListen();
    });
  },
  // mixins:[itemListenerMixin],
  // 活跃，当进入这个组件所做的事
  activated() {
    this.$refs.scroll.Bscroll.refresh();
    // better-scroll还有scrollTo方法，他有三个参数，(x,y,timer)
    this.$refs.scroll.Bscroll.scrollTo(0, this.saveY, 0);
  },
  // 失活，当离开这个组件前所做的事
  deactivated() {
    //  1.保存离开时的y轴的值 (Bscroll.y就可以拿到他滚动的位置)
    this.saveY = this.$refs.scroll.Bscroll.y;

    //2. 取消全局事件的监听(因为这个是父组件，他可以管到其他的子组件，所以在这里取消图片的监听事件)
    this.$bus.$off("imgonload", this.itemImgListen);
  },
  methods: {
    // 事件监听的方法
    typebtn(index) {
      this.currentType = this.arr[index];
      this.$refs.tabcontrol1.currendIndex = index;
      this.$refs.tabcontrol.currendIndex = index;
    },
    // 下面是网络请求相关的方法
    getHomeMultidata() {
      //这里用一个函数包含另一个函数,这里的数据要好好想想
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //这里是核心
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list); //当想要往数组里面追加元素的时候用...
        this.goods[type].page += 1;
        //  完成了上拉加载更多
         this.$refs.scroll.Bscroll.finishPullUp();
      });
    },
    backclick() {
      // 这里需要重点注意,很精辟
      // refs可以取到这个组件里面的方法，属性之类的 ，很重要
      this.$refs.scroll.Bscroll.scrollTo(0, 0, 500);
    },
    // 监听页面滚动事件
    scroll(position) {
      // if(position.y<=-1500){
      //   this.isshow=true
      // }else{             这种写法太low了
      //   this.isshow=false
      // }
      // 1.判断backtop是否显示
      this.isshow = -position.y >= 1500;
      // 2.决定tabcontrol是否吸顶(position:fixed)
      // this.isFixed = -position.y >= this.taboffsettop;
      this.tabisshow = -position.y >= this.taboffsettop;
    },

    pullingUp() {
      //组件传信就是你想在子组件实现那个方法，但是数据不够，直接就传个事件过来，然后就相当于子组件的具体事件就可以在父组件实现，用到父组件的数据完成功能

      this.getHomeGoods(this.currentType);
     
    },
    swiperload() {
      this.taboffsettop = this.$refs.tabcontrol.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
/* #home { */
/* padding-top: 44px; */
/* vh :viewport-height 视口*/
/* height: 100vh; */
/* position: relative; */
/* } */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*这里是在用原生浏览器的滚动时，为了让导航不被一起滚动 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1; */
}
/* 这里可以使用粘性属性 */
.tabContrl {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 44px; */
  position: relative;
  z-index: 9;
  background: white;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
