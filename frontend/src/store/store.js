import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { stayStore } from './stay.store.js'
import { reviewStore } from './review.store.js'
import { orderStore } from './order.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    stayStore,
    reviewStore,
    orderStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
