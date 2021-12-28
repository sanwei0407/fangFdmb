import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mandmobile from 'mand-mobile'
import 'mand-mobile/lib-vw/mand-mobile.css'

Vue.use(mandmobile);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
