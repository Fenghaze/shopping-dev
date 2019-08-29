<template>
    <div>
        <!-- 滚动图片 swipe -->
        <swipe :swipeList='this.swipeList' :isfull='true'></swipe>
        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div>
                        </router-link>                 
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photoshare">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/shopping">
		                    <span class="mui-icon mui-icon-chatbubble"><span class="mui-badge">0</span></span>
		                    <div class="mui-media-body">商品购买</div>
                        </router-link>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div>
                        </a>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div>
                        </a>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div>
                        </a>
                    </li>
		</ul> 
    </div>
</template>

<script>
import swipe from '../subcomponents/Swipe.vue'
export default {
    data() {
        return {
            swipeList: [],
        };
    },
    created(){
        this.getimage()
    },
    methods: {
        getimage(){
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
        }
    },
    components:{
        'swipe':  swipe
    }
};
</script>

<style scoped lang="scss">

</style>
