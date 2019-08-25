<template>
    <div class="comment">
        <br>
        <h3>发表评论</h3>
        <textarea placeholder="评论的内容，不超过120字" maxlength="120"></textarea>
        <mt-button type="primary" size="large">提交</mt-button>
        <hr>
        <div class="comment-list">
            <div class="comment-item" v-for="(item, i) in comment_lst" :key="item.comment_id">
                <div class="comment-title">
                    <span>#{{i+1}} 匿名用户</span>
                    <span>{{item.timestamp}}</span>       
                </div>
                <div class="comment-body">
                    {{item.body}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comment_lst: [],
            page: 1,
        };
    },
    created(){
        this.getcomments()
    },
    methods: {
        getcomments(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getnews/' + this.news_id + "?page=" + this.page;
            this.axios.get(path).then(function(response){
                    that.comment_lst = response.data.comment_lst
            }).catch(function(error){
                alert(error)
            })
        },
        getmore(){
            this.page += 1
            this.getcomments()
        }
    },
    props: ['news_id']
};
</script>

<style lang="scss" scoped>
.comment{
    h3 {
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0
    }
    .comment-list{
        margin: 10px 0;
        .comment-item{
            font-size: 13px;
            .comment-title{
                line-height: 30px;
                background-color: #ccc;
                display: flex;
                justify-content: space-between;
            }  
            .comment-body{
                line-height: 35px;
                text-indent: 2em;
            }  
        }
    }
}
</style>
