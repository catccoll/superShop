import Toast from './Toast.vue'
const obj = {}
obj.install = function (vue) {
    // document.body.appendChild(Toast.$el)
    // vue.prototype.$toast = Toast;
    // 1.创建组件构造器
    const toastConstructor = vue.extend(Toast)
    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()
    // 3.将我们的组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    vue.prototype.$toast = toast;
}
export default obj
// 这样复用组件相当的妙，但是这一般是用在小组件