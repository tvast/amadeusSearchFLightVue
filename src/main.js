import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(VueMaterial)

import VueMoJS from 'vue-mo-js'
Vue.use(VueMoJS)
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import router from './router.js'

Vue.config.productionTip = false
Vue.mixin({
  data: function(){
    return {
      // showLoader : false,
    }
  },
  computed: {
  },/* eslint-disable no-mixed-spaces-and-tabs */
  methods: {
    showLoader: bool => {
      document.getElementById("loader").style.display = bool ? "block" : "none";
    },

    
   }
});
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
