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

// import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:3000');

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO('http://localhost:3000'), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );



import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
Vue.component('BadgerAccordion', BadgerAccordion)
Vue.component('BadgerAccordionItem', BadgerAccordionItem)

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Autocomplete)

import vmodal from 'vue-js-modal'
import VModal from 'vue-js-modal'
Vue.use(vmodal)
Vue.use(VModal, { dialog: true })

Vue.use(VueRouter)

import router from './router.js'

// import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { store } from './store.js';

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    //options: { path: "/my-app/" } //Optional options
}))
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
      document.getElementById("loading").style.display = bool ? "block" : "none";
    },

    
   }
});
new Vue({
  store,
  render: h => h(App),
  router:router
}).$mount('#app')
