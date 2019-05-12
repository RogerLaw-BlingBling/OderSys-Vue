export default {
  data () {
    return {
      sysName: 'InttersTech',
      collapsed: false,
      username: ''
    }
  },
  methods: {
    //注销登录
    logout: function () {
      
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    },
    handleOpen () {
      // console.log('handleopen');
    },
    handleClose () {
      // console.log('handleclose');
    },
    toProceedingProject () {
      this.$router.push({ name: 'ProceedingProject' })
    },
    toDemandInfo () {
      this.$router.push({ name: 'DemandInfo' })
    },
    toOrderList () {
      this.$router.push({ name: 'OrderList' })
    },
    toProjectList () {
      this.$router.push({ name: 'ProjectList' })
    },
    toCustomerList () {
      this.$router.push({ name: 'CustomerList' })
    },
    // toAddContract () {
    //   this.$router.push({ name: 'AddContract' })
    // },
    toAccountingDetail () {
      this.$router.push({ name: 'AccountingDetail' })
    },
    toBusinessStatistics () {
      // eslint-disable-next-line no-unused-expressions
      this.$router.push({ name: 'BusinessStatistics' })
    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // this.$axios({
    // method: 'post',
    //   url: '/user/12345',
    //   data: {}
    // }).then((res)=>{
    // 成功的处理
    // }).catch(err=>{
    // 失败的处理
    // })
    // this.$axios.get('xxxx',{参数}).then()
  }

}
