<template>
    <div>
        <!-- 滚动图片 swipe -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.url">
                <img :src="item.url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-chatbubble"><span class="mui-badge">9</span></span>
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            swipeList: [],
        };
    },
    created(){
        this.getdata()
        this.getimage()
    },
    methods: {
        getdata() {
            var that = this
            const path = 'http://127.0.0.1:5000/api/getdata';
            this.axios.get(path).then(function (response) {
                console.log(response)
                for(var i = 0; i < response.data.length; i++){
                    console.log(response.data[i])
                }        
            }).catch(function (error) {
                alert('Error ' + error);
            })
        },
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
};
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 200px;

    .mint-swipe-item {
        &:nth-child(1){
            background-color: red;
        }
        &:nth-child(2){
            background-color: blue;
        }
        &:nth-child(3){
            background-color: yellow;
        }

        img{
            width: 100%;
            height: 100%
        }
    }
}
</style>
