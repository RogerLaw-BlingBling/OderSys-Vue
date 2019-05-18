import Vue from 'vue'
import Router from 'vue-router'
import message from 'element-ui/lib/message';
import store from '../store/store'
import * as types from '../store/types'
import Login from '@/components/views/login/login.vue'
import Main from '@/components/views/main/main.vue'
import Welcome from '@/components/views/welcome/welcome.vue'
import ProceedingProject from '@/components/views/project/proceedingProject.vue'
import OrderList from '@/components/views/order/orderList.vue'
import AddOrder from '@/components/views/order/addOrder.vue'
import ProjectList from '@/components/views/project/projectList.vue'
import CustomerList from '@/components/views/customer/customerList.vue'
// import AddCustomer from '@/components/views/addCustomer/addCustomer.vue'
import AccountingDetail from '@/components/views/finance/paymentInfo.vue'
import BusinessStatics from '@/components/views/businessStatistics/businessStatistics.vue'
import DemandInfo from '@/components/views/project/demandInfo.vue'

// import store from '@/store/store'

Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      redirect: '/welcome',//转发路由
      meta:{
        requrieAuth: true
      },
      children: [
         {//欢迎页
          path: '/welcome',
          name: 'Welcome',
          component: Welcome,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'proceedingProject',
          name: 'ProceedingProject',
          component: ProceedingProject,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'demandInfo',
          name: 'DemandInfo',
          component: DemandInfo,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'addOrder',
          name: 'AddOrder',
          component: AddOrder,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'projectList',
          name: 'ProjectList',
          component: ProjectList,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'customerList',
          name: 'CustomerList',
          component: CustomerList,
          meta:{
            requrieAuth: true
          }
        },
        // {
        //   path: 'addCustomer',
        //   name: 'AddCustomer',
        //   component: AddCustomer,
        //   meta:{
        //     requrieAuth: true
        //   }
        // },
        {
          path: 'accountingDetail',
          name: 'AccountingDetail',
          component: AccountingDetail,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'businessStatistics',
          name: 'BusinessStatistics',
          component: BusinessStatics,
            meta:{
            requrieAuth: true
          }
        }
      ]

    }
  ]
})
// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

router.beforeEach((to, from, next)=>{
  console.log('Auth ' + (to.meta.requrieAuth ? 'required' :'not required'))
  console.log(store.state.user)
  if(to.meta.requrieAuth) {
    if(store.state.isLogin) {
      next()
      return
    }

    next('/')
    alert('Login required')
    return
  }
  next()

  // if(to.meta.requrieAuth){
  //   if(store.state.user){
  //     next();
  //   }
  //   else{
  //     next({
  //       path: '/',
  //       // query:{redirect:to.fullPath}
  //     })
  //   }
  // }
  // else{
  //   next();
  // }
  // if(to.meta.requrieAuth){
  //   if(sessionStorage.getItem('username')){
  //     next();
  //   } else {
  //     message.warning('请先登录');
  //     router.push({name: 'Login'});
  //   }
  // } else{
  //   next();
  // }
  // next();
})
export default router