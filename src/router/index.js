import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/login/login.vue'
import Main from '@/components/views/main/main.vue'
import ProceedingProject from '@/components/views/proceedingProject/proceedingProject.vue'
import OrderList from '@/components/views/oderList/oderList.vue'
import AddOrder from '@/components/views/addOrder/addOrder.vue'
import OrderDescription from '@/components/views/orderDescription/orderDescription.vue'
import ContractList from '@/components/views/contractList/contractList.vue'
import AddContract from '@/components/views/addContract/addContract.vue'
import AccountingDetail from '@/components/views/accountingDetail/accountingDetail.vue'
import BusinessStatics from '@/components/views/businessStatistics/businessStatistics.vue'
import DemandInfo from '@/components/views/demandInfo/demandInfo.vue'

Vue.use(Router)

export default new Router({
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
      children: [
        {
          path: 'proceedingProject',
          name: 'ProceedingProject',
          component: ProceedingProject
        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: 'demandInfo',
          name: 'DemandInfo',
          component: DemandInfo
        },
        {
          path: 'addOrder',
          name: 'AddOrder',
          component: AddOrder
        },
        {
          path: 'orderDescription',
          name: 'OrderDescription',
          component: OrderDescription
        },
        {
          path: 'contractList',
          name: 'ContractList',
          component: ContractList
        },
        {
          path: 'addContract',
          name: 'AddContract',
          component: AddContract
        },
        {
          path: 'accountingDetail',
          name: 'AccountingDetail',
          component: AccountingDetail
        },
        {
          path: 'businessStatistics',
          name: 'BusinessStatistics',
          component: BusinessStatics
        }
      ]

    }
  ]
})
