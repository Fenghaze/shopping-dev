import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import Vue from 'vue'
import app from './App.vue'

import VueRouter from 'vue-router'
import router from './router.js'

Vue.use(MintUI)
Vue.use(VueRouter)


var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    router,
    render: c => c(app)
})
