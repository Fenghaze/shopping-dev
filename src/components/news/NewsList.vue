<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList"  :key="item.id">
					<router-link :to="'/home/newslist/' + item.id">
						<div class="mui-media-body">
							{{ item.title }}
							<p class='mui-ellipsis'>
                                <span>发表时间：{{ item.timestamp | dateFormat }}</span>
                                <span>点击：{{ item.count }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsList: []
        };
    },
    created(){
        this.getnews()
    },
    methods: {
        getnews(){
            var that = this
            const path = 'http://127.0.0.1:5000/api/getnews';
            this.axios.get(path).then(function(response){
                for(var i = 0; i < response.data.length; i++){
                    that.newsList.push(response.data[i])
                }        
            }).catch(function (error){
                alert(error)
            })
        }
    },
};
</script>

<style scoped lang="scss">
.mui-ellipsis{
    display: flex;
    justify-content: space-between;
}
</style>
