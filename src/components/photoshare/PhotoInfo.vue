<template>
    <div class="photoinfo">
        <h3 class="title">{{ photomsg.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photomsg.timestamp }}</span>
            <span>点击次数：{{ photomsg.count }}次</span>
        </p>
        <hr>
        <vue-preview :slides="slide" @close="handleClose"></vue-preview>
        <div class="content">{{ photomsg.msg }}</div>
        <!-- 评论子组件 -->
        <comment-box :photo_id="this.id"></comment-box>
    </div>
</template>

<script>

import comment from '../subcomponents/PhotoComment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,// 将 url 地址中传递过来的 id 值，挂载到 data 上，方便调用
            photomsg: '',
            slide: []
        };
    },
    created(){
        this.getphotomsg()
        this.getlst()
    },
    methods: {
        getphotomsg(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getphotomsg/' + this.id
            this.axios.get(path).then(function(response){
                that.photomsg = response.data
            }).catch(function(error){
                alert(error)
            })
        },
        getlst(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getphoto/3'
            this.axios.get(path).then(function(response){
                // 循环每个图片，定义 w，h 属性
                response.data.forEach(item => {
                    item.w = 600
                    item.h = 400
                })
                that.slide = response.data
            }).catch(function(error){
                alert(error)
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{
        'comment-box': comment
    }
};
</script>

<style scoped lang="scss">
.photoinfo{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
    }
}
</style>
