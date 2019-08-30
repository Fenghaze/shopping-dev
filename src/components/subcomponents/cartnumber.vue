<template>
    <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value='this.count'
        @change="countChanged" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data() {
        return {};
    },
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods: {
        countChanged(){
            console.log(this.goods_id, this.$refs.numbox.value)
            // 每当购物车的数量改变，就把最新的数量同步到 store 中
            this.$store.commit('updatecount', {
                id: this.goods_id,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ['count', 'goods_id']
};
</script>

<style scoped lang="scss">

</style>
