import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import VipContainer from './components/tabbar/VipContainer.vue'
import CartContainer from './components/tabbar/CartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoShare from './components/photoshare/PhotoShare.vue'
import PhotoInfo from './components/photoshare/PhotoInfo.vue'
import GoodsList from './components/Goods/GoodsList.vue'
import GoodsInfo from './components/Goods/GoodsInfo.vue'
import GoodsComment from './components/subcomponents/GoodsComment.vue'
var router = new VueRouter({
    routes:[
        {path:'/', component: HomeContainer},
        {path: '/home', component: HomeContainer},
        {path: '/vip', component: VipContainer},
        {path: '/cart', component: CartContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/newslist/:id', component: NewsInfo},
        {path: '/home/photoshare', component: PhotoShare},
        {path: '/home/photoshare/:id', component: PhotoInfo},
        {path: '/home/shopping', component: GoodsList},
        {path: '/home/shopping/:id', component: GoodsInfo},
        {path: '/home/goodscomments/:goods_id', component: GoodsComment, name: "/home/goodscomments"},
    ],
    // 覆盖默认的路由高亮的类
    linkActiveClass: 'mui-active'
})

export default router