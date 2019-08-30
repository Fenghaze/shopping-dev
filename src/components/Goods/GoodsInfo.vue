<template>
    <div class="goodsinfo-container">
        <transition 
            @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
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
                        <p>购买数量：<numberbox @getcount="getSelectCount" :max="info.count"></numberbox></p>
                        <p>
                            <span><mt-button type="primary" size="small">立即购买</mt-button></span>
                            <span><mt-button type="danger" size="small" @click="addgoods">加入购物车</mt-button></span>
                            <!-- 
                                按钮属于 GoodsInfo，而数字属于 number 子组件；
                                涉及到父子组件的嵌套时，就无法直接在父组件中使用子组件的数据；
                                使用事件调用机制：父向子传递方法，子调用这个方法，同时把把数据当作参数，传递给这个方法
                             -->
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
            info: '',
            ballFlag: false,
            selectedCount: 1 // 保存用户选择的商品数量，默认为 1
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
        },
        addgoods(){
            // 将商品添加到购物车
            this.ballFlag = !this.ballFlag
            // 拼接一个商品对象，保存到 store 中
            var goods = {
                id: this.goods_id,
                count: this.selectedCount,
                price: this.info.price,
                selected: false
            }
            // 调用 store 中的方法，将商品加入公共数据 cart
            this.$store.commit('add', goods)
        },
        beforeEnter(el){
            el.style.transform="translate(0, 0)"
        },
        enter(el, done){
            el.offsetWidth;
            
            // 动画不准确的原因：位置固定死了，无法自适应手机屏幕
            // 小球动画优化思路
            // 得到徽标的横纵坐标，小球的横纵坐标，然后求横纵坐标差值
            // 使用 domObject.getBoundingClientRect() 获取
            // 1.获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 2. 获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()
            const x = badgePosition.left - ballPosition.left
            const y = badgePosition.top - ballPosition.top

            el.style.transform=`translate(${x}px, ${y}px)`
            el.style.transition = 'all 1s cubic-bezier(.4,-0.3,1,.68)'
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectCount(count){
            // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到 selecedCount 中
            this.selectedCount = count
        }
    },
    components:{
        'swipe':swipe,
        'numberbox': number
    }
};
</script>

<style scoped lang="scss">
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index:99;
    top:390px;
    left: 146px;
}
</style>
