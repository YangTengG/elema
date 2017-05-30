import Vue from 'vue'
import Router from 'vue-router'

import Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'
import Seller from '../components/seller/seller'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Goods},
    {path: '/goods', component: Goods},
    {path: '/ratings', component: Ratings},
    {path: '/seller', component: Seller}
  ]
})

