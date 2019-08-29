<template>
    <div class="comment">
        <br>
        <h3>发表评论</h3>
        <textarea placeholder="评论的内容，不超过120字" maxlength="120" v-model="body"></textarea>
        <mt-button type="primary" size="large" @click="addcomment">提交</mt-button>
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
            goods_id: this.$route.params.goods_id,
            comment_lst: [],
            page: 1,
            body: ''
        };
    },
    created(){
        this.getcomments()
    },
    methods: {
        getcomments(){
            var that = this
            console.log(this.goods_id)
            const path = 'http://127.0.0.1:5000/api/goodscomments/' + this.goods_id + "?page=" + this.page;
            this.axios.get(path).then(function(response){
                console.log(response)
                that.comment_lst = that.comment_lst.concat(response.data)
            }).catch(function(error){
                alert(error)
            })
        },
        getmore(){
            this.page += 1
            this.getcomments()
        },
        addcomment(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/addgoodscomment/' + this.goods_id
            this.axios.post(path, {body: this.body})
            .then(function(response){
                console.log(response)
                if(response.status === 200){
                    var cmt = { name: '匿名用户', timestamp: Date.now(), body: that.body}
                    that.comment_lst.push(cmt)
                    that.body = ''
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    },
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
