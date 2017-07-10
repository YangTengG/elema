// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.css'
import 'jQuery/tmp/jquery.js'
import 'common/iconStyle.css'

Vue.use(VueResource)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  VueResource,
  template: '<App/>',
  components: { App }
})
