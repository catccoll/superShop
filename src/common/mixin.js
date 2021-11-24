export const itemListenerMixin = {
    mounted() {
        this.itemImgListen = function () {
            this.$refs.scroll.Bscroll.refresh();
        };
        this.$bus.$on("imgonload", () => {
            this.itemImgListen();
        
        });
    
    },
    data() {
        return {
            //    属性也可以混入
            // 组件也可以混入 但是组件必须要现在这里导入，methods里面的函数不能抽

        }
    }

}