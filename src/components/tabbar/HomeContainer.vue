<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.url">
                <img :src="item.url" alt="">
            </mt-swipe-item>
        </mt-swipe>
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
