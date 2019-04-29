export default {
  data () {
    return {
      sysName: 'InttersTech',
      collapsed: false,
      username: ''
    }
  },
  methods: {
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
    toAddOrder () {
      this.$router.push({ name: 'AddOrder' })
    },
    toOrderDescription () {
      this.$router.push({ name: 'OrderDescription' })
    },
    toContractList () {
      this.$router.push({ name: 'ContractList' })
    },
    toAddContract () {
      this.$router.push({ name: 'AddContract' })
    },
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
  }

}
