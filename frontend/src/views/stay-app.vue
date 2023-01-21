<template>
  <div>
    <stay-filter></stay-filter>
    <div class="mainContainer">
      <stay-list v-if="stays.length" :stays="stays"></stay-list>
      <p class="stay-list" v-else-if="!isLoadingStays">Didn't found stays</p>
      <ul :style="{ 'margin-top': loaderMargin }" v-if="isLoadingStays" id="loading-cards" class="stay-list card-grid">
        <li v-for="index in 20" :key="index">
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
    isLoadingStays() {
      return this.$store.getters.isLoadingStays
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
    eventBus.on('toggleMenuModal', this.toggleMenuModal)
    eventBus.on('setLoaderMargin', this.setLoaderMargin)
  },
  methods: {
    setLoaderMargin(margin) {
      this.loaderMargin = margin
    }
  },
  components: {
    stayList,
    stayFilter,
    skeletonLoaderStays
  }
}
</script>
