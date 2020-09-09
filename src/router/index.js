import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Reg from '../views/Reg.vue';

// 导入组件文件
import Header from '../components/demo/Header.vue';
import Field from '../components/demo/Field.vue';
import Navvar from '../components/demo/Navvar.vue';
import Tabcon from '../components/demo/Tabcon.vue';
import List from '../components/demo/List.vue';
import Tabbar from '../components/demo/Tabbar.vue';
import Tabbar2 from '../components/demo/Tabbar2.vue';
import Infinite from '../components/demo/Infinite.vue';
//设定路由信息
Vue.use(VueRouter)

const routes = [

  {
    path: '/infinite',
    component: Infinite
  },
  {
    path: '/reg',
    component: Reg
  }
  ,
  {
    path: '/tabbar2',
    component: Tabbar2
  }
  ,
  {
    path: '/tabbar',
    component: Tabbar
  }
  ,
  {
    path: '/list',
    component: List
  }
  ,
  {
    path: '/tabcon',
    component: Tabcon
  }
  , {
    path: '/login',
    component: Login
  }
  , {
    path: '/navvar',
    component: Navvar
  }
  , {
    path: '/field',
    component: Field
  },
  {
    path: '/header',
    component: Header
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
