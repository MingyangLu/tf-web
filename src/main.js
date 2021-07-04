import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './common/api.js'
import store from './store/index.js'
import Vuex from 'vuex'
import TfSelect from './common/TfSelect'
import TfCommon from './tf-common/index'
import TfUtils from './utils/index'
import Bus from '@/utils/bus'
Vue.config.productionTip = false
Vue.prototype.$utils = TfUtils
Vue.prototype.bus = Bus
Vue.use(ElementUI)
Vue.use(router)
Vue.use(Vuex)
Vue.use(TfSelect)
Vue.use(TfCommon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
