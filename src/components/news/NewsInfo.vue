<template>
    <div class="newsinfo">
        <h3 class="title">{{ news.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ news.timestamp | dateFormat }}</span>
            <span>点击次数：{{ news.count }}次</span>
        </p>
        <hr>
        <div class="content">{{ news.body }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,// 将 url 地址中传递过来的 id 值，挂载到 data 上，方便调用
            news: ''
        };
    },
    created(){
        this.getinfo()
    },
    methods: {
        getinfo(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getnews/' + this.id;
            this.axios.get(path).then(function(response){
                that.news = response.data
            }).catch(function(error){
                alert(error)
            })
        }
    },
};
</script>

<style scoped lang="scss">
.newsinfo{
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
