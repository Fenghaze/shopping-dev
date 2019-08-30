<template>
    <div>
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodslst" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <div class="goods">
                            商品{{item.id}}
                            <p>
                                <span class="price">￥{{item.price}}</span>
                                <numbox :goods_id="item.id" :count='$store.getters.getgoodsnum[item.id]'></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <p>总计</p>
                    <p>已选中商品 0 件，总计：￥0</p>
                    <button>去结算</button>
				</div>
			</div>
		</div>

            {{this.$store.getters.getcount}}
    </div>
</template>

<script>
import numbox from '../subcomponents/cartnumber.vue'

export default {
    data() {
        return {
            goodslst: []
        };
    },
    created(){
        this.getgoodslst()
    },
    methods: {
        getgoodslst(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/goodsinfo/'
            this.$store.state.cart.forEach(item => {
                this.axios.get(path + item.id).then(response => {
                    that.goodslst.push(response.data)
                })
            })
        },
        remove(id, index){
            // 点击删除， 把商品从 store 中根据 id 删除，同时使用 index 来删除 goodslst 中的商品
            this.goodslst.splice(index, 1)
            this.$store.commit('removeFromCart', id)
        }
    },
    components:{
        numbox,
    }
};
</script>

<style scoped lang="scss">
.goods-list{
    .mui-card-content-inner{
        display: flex;
        align-items: center;
    }
}
</style>
