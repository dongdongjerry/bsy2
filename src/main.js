// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 引入路由
import '~/css/reset.css' // 引入重置样式
import '~/css/common.scss' // 引入通用样式
import 'mint-ui/lib/style.css' // 引入mint-ui样式
import Mint from 'mint-ui' // 引入mint-ui
import '~/js/rem.js'  // 引入rem计算模块
import api from '~/js/api.js' // 引入请求模块

Vue.use(Mint);
Vue.config.productionTip = false;
Vue.prototype.$http = api;
Vue.prototype.$ac01 = 'A/hS8fMOqUFZ7khcPAcL6w=='; // 无权限
Vue.prototype.$ac02 = 'A/hS8fMOqUFGvU1GbAdO7A=='; // 有权限
Vue.prototype.$ac03 = 'A/hS8fMOqUFA+kwZaBcC4A=='; // 封禁
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
