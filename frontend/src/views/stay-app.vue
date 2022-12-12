<template>
  <stay-filter></stay-filter>
  <div>
    <stay-list class="" v-if="stays.length && isLoaded" :stays="stays"></stay-list>
    <div v-else="stays" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <hr />
  </div>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue'
import stayList from '../cmps/stay-list.vue'
import {showErrorMsg, showSuccessMsg , eventBus} from '../services/event-bus.service'
import {stayService} from '../services/stay.service'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../store/stay.store'
export default {
  data() {
    return {
      stayToAdd: stayService.getEmptyStay(),
      isLoaded:false
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    }
  },
  created() {
    this.$store.dispatch({type: 'loadStays'})
    eventBus.on('toggleMenuModal' , this.toggleMenuModal)
  },
  methods: {
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = {...stay}
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    }
  },
  components:{
    stayList,
    stayFilter
  }

  
}
</script>
