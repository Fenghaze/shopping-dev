<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- swipeList 是传进来的参数 -->
            <mt-swipe-item v-for="item in swipeList" :key="item.url">
                <img :src="item.url" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {},
    props:['swipeList', 'isfull']
};
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
        img{
            height: 100%
        }
    }
}
.full{
    width:100%
}
</style>
