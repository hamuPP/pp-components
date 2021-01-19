/**
 * Created by ty on 2021-01-15
 */
"use strict";
import 'babel-polyfill'

/* 引入Vue相关 */
import Vue from 'vue'
// 引入我的组件、以及样式。并且应用组件 --START--
import PP_UI_components from '@/index.js';
import '@/styles/index.scss';
Vue.use(PP_UI_components)
// 引入我的组件、以及样式。并且应用组件 --END--

import App from './app.vue';

new Vue({
    el: '#appExample',
    // router: router,
    render: h => h(App)
});