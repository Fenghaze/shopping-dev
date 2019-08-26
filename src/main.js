import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import Vue from 'vue'
import app from './App.vue'

import VueRouter from 'vue-router'
import router from './router.js'
// 数据请求，需要用到 vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import QS from 'qs';
import moment from 'moment'

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

// 定义全局时间戳过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MMMM-DDDD hh:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    router,
    render: c => c(app)
})
