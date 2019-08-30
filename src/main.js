import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import Vue from 'vue'
import app from './App.vue'
import Vuex from 'vuex'

import VueRouter from 'vue-router'
import router from './router.js'
// 数据请求，需要用到 vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import VuePreview from 'vue-preview'
 

Vue.use(VuePreview)

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

// 定义全局时间戳过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MMMM-DDDD hh:mm:ss"){
    return moment(dataStr).format(pattern)
})

// 每次进入网站，首先调用 main.js，在刚调用的时候，先从本地存储中把数据读出来
var cart = JSON.parse(localStorage.getItem('cart') || '[]')

var store = new Vuex.Store({
    state:{
        cart: cart
    },
    mutations:{
        add(state, goods){// 把商品加入到购物车
            var flag = false
            state.cart.some(item => {
                // 情况1： 如果购物车中有重复商品，只需改变数据
                if(item.id === goods.id){
                    item.count += parseInt(goods.count)
                    flag = true
                    return flag
                }
            })
            // 情况2： 如果没有商品，则把商品数据 push 
            if(flag === false){
                state.cart.push(goods)
            }
            // cart 更新完成后，存储到本地的 localStorage 保存数据
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters:{// 相当于 computed（计算属性）
        getcount(state){// 实时计算购物车中的商品数量
            var num = 0
            state.cart.forEach(item => {
                num += item.count
            })
            return num
        }
    }
})

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    router,
    render: c => c(app),
    store,
})
