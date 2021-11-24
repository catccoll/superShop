import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import toast from 'components/common/Toast/index.js'
Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件
Vue.use(LazyLoad, {
  // 这里导入图片必须用require，这个作用是默认图片没有及时显示，就用这张图片先代替
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
