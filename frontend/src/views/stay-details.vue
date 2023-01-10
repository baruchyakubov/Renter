<template>
  <div v-if="stay" class="stay-details detailsContainer">
    <stay-main :stay="stay"></stay-main>
    <div class="detailsColumnsContainer">
      <div class="column1">
        <host-details :stay="stay"></host-details>
        <stay-attributes />
        <div class="stay-details-summary">
          <p>{{ stay.summary }}</p>
          <p class="showMoreBtn">Show more..</p>
        </div>
        <stay-amenities :amenities=stay.amenities></stay-amenities>
      </div>
      <reserve-form :stay="stay"></reserve-form>
    </div>
    <div class="map-container">
      <h1>Where you'll be</h1>
      <location-map :stayLoc="stay.loc"></location-map>
    </div>
    <stay-reviews :stay="stay"></stay-reviews>
  </div>
  <div v-else class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <mobile-footer :stay="stay" v-if="stay"/>
</template>
<script>
import locationMap from '../side-cmps/location-map.vue'
import { eventBus } from '../services/event-bus.service'
import stayAttributes from '../side-cmps/stay-preview-attributes.vue'
import stayAmenities from '../side-cmps/amenities.vue'
import stayMain from '../side-cmps/stay-main.vue'
import reserveForm from '../side-cmps/stay-reserve-form.vue'
import stayReviews from '../side-cmps/stay-reviews.vue'
import calendar from '../side-cmps/calendar.vue'
import hostDetails from '../side-cmps/stay-host-details.vue'
import mobileFooter from '../cmps/mobile-footer.vue'
export default {
  data() {
    return {
      stay: null,
      isSuperHost: false
    }
  },
  mounted() {
    eventBus.emit('toggleLayout', true)
    var scrollTop = function () {
      window.scrollTo(0, 0);
    }
    this.scrollTop()
  },
  async created() {
    await this.setStay()
    if (this.rating > 4.6 && this.stay.reviews.length > 3) this.isSuperHost = true
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0)
    },
    async setStay() {
      const stayId = this.$route.params.id
      if (stayId) {
        const currStay = await this.$store.dispatch({ type: 'setCurrStay', stayId })
        var currStayCopy = JSON.parse(JSON.stringify(currStay))
        this.stay = currStayCopy

      } else {
        this.stay = stayService.getEmptyStay()
      }
    },
  },
  computed: {

  },
  components: {
    stayAttributes,
    stayMain,
    stayAmenities,
    reserveForm,
    stayReviews,
    calendar,
    hostDetails,
    locationMap,
    mobileFooter
  }
}
</script>