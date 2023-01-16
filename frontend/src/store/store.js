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
    filterFocus:'',
    activeMobileFilter: 'mobileCountrySearch'
  },
  mutations: {
    setFilterFocus(state , { value }){
      state.filterFocus = value
    },
<<<<<<< HEAD
    setMobileFilter(state , { value }){
      state.activeMobileFilter = value
=======
    setActiveFilter(state , { activeFilter }){
      state.activeMobileFilter = activeFilter
>>>>>>> d7827332cee5af4138cda84f6f66051207126fed
    }
  },
  getters:{
    filterFocus({ filterFocus }) { return filterFocus },
    activeMobileFilter({ activeMobileFilter }) { return activeMobileFilter },
  },
  actions: {
  }
})