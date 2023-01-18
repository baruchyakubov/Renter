<template>
  <div>
    <stay-filter></stay-filter>
    <div class="mainContainer">
      <stay-list v-if="stays.length" :stays="stays"></stay-list>
      <!-- <div v-else class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> -->
      <ul :style="{ 'margin-top': loaderMargin }" v-if="isLoadingStays" id="loading-cards" class="stay-list card-grid">
        <li v-for="index in 20" :key="index" >
            <skeleton-loader-stays></skeleton-loader-stays>
        </li>
    </ul>
      <hr />
    </div>
  </div>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue'
import stayList from '../cmps/stay-list.vue'
import { showErrorMsg, showSuccessMsg, eventBus } from '../services/event-bus.service'
import { stayService } from '../services/stay.service'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../store/stay.store'
import skeletonLoaderStays from '../side-cmps/skeleton-loader-stays.vue'
export default {
  data() {
    return {
      stayToAdd: stayService.getEmptyStay(),
      loaderMargin: '90px'
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    },
    isLoadingStays(){
      return this.$store.getters.isLoadingStays
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
    eventBus.on('toggleMenuModal', this.toggleMenuModal)
    eventBus.on('setLoaderMargin' , this.setLoaderMargin)
  },
  methods: {
    setLoaderMargin(margin){
      console.log(margin);
      this.loaderMargin = margin
    },
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = { ...stay }
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    }
  },
  components: {
    stayList,
    stayFilter,
    skeletonLoaderStays
  }
}
</script>
