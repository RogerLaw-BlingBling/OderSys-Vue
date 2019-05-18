// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.use(VueParticles)
import store from './store/store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
