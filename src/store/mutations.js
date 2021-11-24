import {ADDCOUNT,ADDTOCART} from './mutations-types'
export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中每个方法尽可能完成的事件比较单一一点
    [ADDCOUNT](state, payload) {
        payload.count++
    },
    [ADDTOCART](state, product) {
        product.count = 1
        product.checked=true
        state.cartList.push(product)
    }
}