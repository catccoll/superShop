import { ADDCOUNT, ADDTOCART } from './mutations-types'
export default {
  // actions里面不仅仅只放异步操作的步骤，还放if判断类型的条件
  addCart1(context, product) {
    return new Promise((resolve, reject) => {
      // context里面有state和commit
      // 判断是否重复添加
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid == product.iid) {
          oldProduct = item
        }
      }
      // 判断oldProduct
      if (oldProduct) {//这里是用引用类型，照样可以改变里面的值，这方法不错
        context.commit(ADDCOUNT, oldProduct)
        resolve('当前数量+1')
      } else {

        context.commit(ADDTOCART, product)
        resolve('添加了新商品')
      }
    })
  }
}