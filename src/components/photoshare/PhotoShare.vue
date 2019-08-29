<template>
    <div>
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a @tap="getphoto(item.id)" :class="['mui-control-item', item.id == 1 ? 'mui-active' : '']" v-for="item in categoryList" :key="item.id">
						{{ item.name }}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片列表 -->
        <ul class="photo-list">
            <router-link tag="li" :to="'/home/photoshare/' + item.id" v-for="item in photoList" :key="item.id">
                <img v-lazy="item.url">
            </router-link>
        </ul>
		
    </div>
</template>

<script>
// 1.导入 mui.js
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data() {
        return {
            categoryList : [],
            photoList: [],
		};
    },
    mounted(){// 当组件中的 DOM 被渲染到页面中后，执行这个钩子函数；如果要操作元素，最好在此函数中执行   
        mui('.mui-scroll-wrapper').scroll({// 2.初始化滑动控件
            deceleration: 0.0005
        }) // 3.使用 babel 插件移除严格模式
	},
	created(){
        this.getcategory()
        this.getphoto(1)
	},
    methods: {
		getcategory(){
			var that = this
            const path = 'http://127.0.0.1:5000/api/getcategory';
            this.axios.get(path).then(function(response){
                for(var i = 0; i < response.data.length; i++){
                    that.categoryList.push(response.data[i])
                }        
            }).catch(function (error){
                alert(error)
            })
        },
        getphoto(category_id){
			var that = this
            const path = 'http://127.0.0.1:5000/api/getphoto/' + category_id;
            this.axios.get(path).then(function(response){
                that.photoList = response.data
            }).catch(function (error){
                alert(error)
            })
		},
	},
};
</script>

<style scoped lang="scss">
 * { 
        touch-action: pan-y; 
} 


.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0px;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999
        img{
            width: 100%;
            vertical-align: middle;
        }

        img[lazy=loading] {
            
            height: 50px;
            margin: auto;
        }
    }
}
</style>
