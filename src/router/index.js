import Vue from 'vue'
import Router from 'vue-router'
import message from 'element-ui/lib/message';
import store from '../store/store'
import * as types from '../store/types'
import Login from '@/components/views/login/login.vue'
import Main from '@/components/views/main/main.vue'
import ProceedingProject from '@/components/views/project/proceedingProject.vue'
import OrderList from '@/components/views/order/orderList.vue'
import AddOrder from '@/components/views/order/addOrder.vue'
import OrderDescription from '@/components/views/order/orderDescription.vue'
import ContractList from '@/components/views/contractList/contractList.vue'
import AddContract from '@/components/views/addContract/addContract.vue'
import AccountingDetail from '@/components/views/finance/accountingDetail.vue'
import BusinessStatics from '@/components/views/businessStatistics/businessStatistics.vue'
import DemandInfo from '@/components/views/project/demandInfo.vue'

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
      meta:{
        requrieAuth: true
      },
      children: [
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
          path: 'orderDescription',
          name: 'OrderDescription',
          component: OrderDescription,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'contractList',
          name: 'ContractList',
          component: ContractList,
          meta:{
            requrieAuth: true
          }
        },
        {
          path: 'addContract',
          name: 'AddContract',
          component: AddContract,
          meta:{
            requrieAuth: true
          }
        },
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
  // if(to.meta.requrieAuth){
  //   if(store.state.token){
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
  if(to.meta.requrieAuth){
    if(sessionStorage.getItem('username')){
      next();
    } else {
      message.warning('请先登录');
      router.push({name: 'Login'});
    }
  } else{
    next();
  }
  
})
export default router