import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Axios模块
import axios from 'axios'
import qs from 'qs'
//导入Mint UI
import MintUI from 'mint-ui'

//导入Mint UI的样式表文件
import 'mint-ui/lib/style.min.css'

//通过Vue.use()方法注册为插件
Vue.use(MintUI)
// 配置Axios的基础地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
//在Vue的原型链上扩展属性
Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
