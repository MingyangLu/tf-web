import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index/index'
import Home from './components/Home'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
            // name: 'Index',
            // component: Index
        },
        {
            path: '/home',
            redirect: '/index',
            component: Home,
            children: [{
                path: '/index',
                component: Index,
                redirect: '/price',
                children:[{
                    path: '/price',
                    component: () => import('@/components/price/Index')
                },{
                    path: '/order',
                    component: () => import('@/components/order/Index')
                }]
            },{
                path: '/orderManagement',
                component: () => import('@/components/queryOrder/Index')
            },{
                path: '/userManagement',
                component: () => import('@/components/user/Index')
            },{
                path: '/roleManagement',
                component: () => import('@/components/role/Index')
            },{
                path: '/authManagement',
                component: () => import('@/components/auth/Index')
            }]
        }
    ]
})
