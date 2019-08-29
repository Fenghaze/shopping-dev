<template>
    <div class="goodsinfo-container">
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <swipe :swipeList="this.swipeList" :isfull="false"></swipe>
				</div>
			</div>
		</div>
        <div class="mui-card">
			<div class="mui-card-header">商品{{ this.info.id }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>销售价：￥{{ this.info.price }}</p>
                        <p>购买数量：<numberbox></numberbox></p>
                        <p>
                            <span><mt-button type="primary" size="small">立即购买</mt-button></span>
                            <span><mt-button type="danger" size="small">加入购物车</mt-button></span>
                        </p>
					</div>
				</div>
			</div>
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>库存情况：{{ this.info.count }}件</p>
					</div>
				</div>
			<div class="mui-card-footer">
                <mt-button type="danger" size="large" @click="getComments(info.id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import swipe from '../subcomponents/Swipe.vue'
import number from '../subcomponents/number.vue'

export default {
    data() {
        return {
            goods_id: this.$route.params.id,
            swipeList: [],
            info: ''
        };
    },
    created(){
        this.getswipe()
        this.getinfo(this.goods_id)
    },
    methods: {
        getswipe(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getimage';
            this.axios.get(path).then(function(response){
                for(var i = 0; i < response.data.length; i++){
                    console.log(response.data[i])
                    that.swipeList.push(response.data[i])
                }        
            }).catch(function (error){
                alert(error)
            })
        },
        getinfo(goods_id){
            var that = this
            var path = 'http://127.0.0.1:5000/api/goodsinfo/' + this.goods_id
            this.axios.get(path).then(function(response){
                that.info = response.data       
            }).catch(function (error){
                alert(error)
            })
        },
        getComments(goods_id){
            this.$router.push({
                name: "/home/goodscomments",
                params: {goods_id}
            })
        }   
    },
    components:{
        'swipe':swipe,
        'numberbox': number
    }
};
</script>

<style scoped lang="scss">

</style>
