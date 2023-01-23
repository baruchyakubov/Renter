import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { stayStore } from './stay.store.js'
import { orderStore } from './order.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    stayStore,
    orderStore
  },
  state: {
    filterFocus:'',
    activeMobileFilter: 'mobileCountrySearch',
    isOpenReserveMobile: false
  },
  mutations: {
    setFilterFocus(state , { value }){
      state.filterFocus = value
    },
    setOpenReserveMobile(state , { value }){
      state.isOpenReserveMobile = value
    },
    setActiveFilter(state , { activeFilter }){
      state.activeMobileFilter = activeFilter
    }
  },
  getters:{
    filterFocus({ filterFocus }) { return filterFocus },
    activeMobileFilter({ activeMobileFilter }) { return activeMobileFilter },
    isOpenReserveMobile({ isOpenReserveMobile }) { return isOpenReserveMobile }
  },
  actions: {
  }
})