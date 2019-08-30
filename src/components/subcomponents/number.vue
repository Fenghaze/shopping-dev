<template>
    <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            // 每当文本框的数据被修改时，立即把最新的数据通过事件调用传递给父组件
            this.$emit('getcount', parseInt(this.$refs.numbox.value))
        }
    },
    props: ['max'],
    /*
        max 是异步获取请求后就已经有了的空数据，因此传过来时是空的，
        需要通过监控 max 来获得异步执行后的最终结果
        使用 watch 属性监听父组件传过来的 max 值
    */
    watch:{
        // 属性监听
        max: function(newVal, oldVal){
            mui('.mui-numbox').numbox().setOption('max', newVal)
        }
    }
};
</script>

<style scoped lang="scss">

</style>
