import Vue from 'vue'
import VueRouter from 'vue-router'
// 组件懒加载，当前组件活跃的时候对应的组件展示，当其他组件不活跃的时候，就不会展示，如果不使用import，name他就会都展示，影响性能，动态导入组件
const Home = () => import('views/home/Home.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const ShopCart = () => import('views/shopCart/ShopCart.vue')
const Detail = () => import('views/detail/detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  }, {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopCart',
    component: ShopCart
  },
  {
    path: '/detail/:iid',
    component: Detail
  }


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
