import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import { sync } from 'vuex-router-sync'

// Meteor Tracker integration
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

import * as filters from './filters'
for (const key in filters) {
  Vue.filter(key, filters[key])
}

import App from './ui/App.vue'
import routes from './routes'
import storeOptions from './store'

function createApp () {
  const router = new VueRouter({
    mode: 'history',
    routes,
  })

  const store = new Vuex.Store(storeOptions)

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  return {
    app: new Vue({
      el: '#app',
      router,
      store,
      ...App,
    }),
    router,
    store,
  }
}

export default createApp
