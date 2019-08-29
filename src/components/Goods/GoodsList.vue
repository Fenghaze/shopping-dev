<template>
    <div class="goodslst">
        <div class="goodsitem" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.url">
            <div class="info">
                <p class="price">￥{{item.price}}</p>
                <p class="count">
                    <span>剩余：{{item.count}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsList: [],
            page: 1
        };
    },
    created(){
        this.getgoodslist()
    },
    methods: {
        getgoodslist(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getgoods?page=' + this.page
            console.log(this.page)
            this.axios.get(path).then(response => {
                that.goodsList = that.goodsList.concat(response.data)
            })
        },
        getmore(){
            this.page += 1
            this.getgoodslist()
        },
        goDetail(goods_id){
            // 使用 vue-router 提供编程式导航进行路由跳转
            this.$router.push('shopping/' + goods_id)
        }
    },
};
</script>

<style scoped lang="scss">
.goodslst{
    display: flex;
    flex-wrap:wrap;
    .goodsitem{
        width: 100%;
        img{
            width:100%
        }
    }
}
</style>