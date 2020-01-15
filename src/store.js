//store.js
// Make sure to call Vue.use(Vuex) first if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	state: {
    flavor: '',
    pricing :''
  },
  mutations: {
    change(state, flavor) {
      state.flavor = flavor
    }
    ,
    changePricing (state, pricing) {
    state.pricing = pricing
    }
  },
  getters: {
    flavor: state => state.flavor,
    pricing: state => state.pricing,

  }
})