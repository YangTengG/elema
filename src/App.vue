<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to='./goods' class="tab-item">商品</router-link>
      <router-link to='./ratings' class="tab-item">评价</router-link>
      <router-link to='./seller' class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import {urlParse} from './common/js/util.js'

  const ERR_OK = 0
  
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style>
#app {
}
#app .tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab .tab-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.tab .router-link-active {
  color: rgb(240, 20, 20);
}
</style>
