<template>
  <div>
    <nav-details :stay="stay" :isReserveNavShown="isReserveNavShown" v-if="isDetailsNavShown && stay"></nav-details>
    <div v-if="stay" class="stay-details detailsContainer">
      <mobile-header-details></mobile-header-details>
      <stay-main :stay="stay"></stay-main>
      <div class="detailsColumnsContainer">
        <div class="column1">
          <host-details :stay="stay"></host-details>
          <stay-attributes />
          <div class="aircover">
            <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674293987/czcblqj1okmht5xmeuq3.png" alt="">
            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues
              like trouble checking in.</p>
            <div>Learn more</div>
          </div>
          <div class="stay-details-summary">
            <p>{{ stay.summary }}</p>
            <div class="toggleSummary">
              <span>Show more</span>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                focusable="false"
                style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                <g fill="none">
                  <path
                    d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932">
                  </path>
                </g>
              </svg>
            </div>
          </div>
          <stay-amenities :amenities=stay.amenities></stay-amenities>
        </div>
        <reserve-form :class="{openedReserve:IsOpenedReserveMobile}" :stay="stay"></reserve-form>
      </div>
      <div ref="location" class="map-container">
        <h1>Where you'll be</h1>
        <location-map :stayLoc="stay.loc"></location-map>
      </div>
      <stay-reviews :stay="stay"></stay-reviews>
    </div>
    <div v-else class="lds-spinner">
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
    </div>
    <mobile-footer :stay="stay" v-if="stay" />
  </div>
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
import mobileHeaderDetails from '../side-cmps/mobile-header-details.vue'
import navDetails from '../side-cmps/nav-details.vue'
export default {
  data() {
    return {
      stay: null,
      isSuperHost: false,
      isDetailsNavShown: false,
      isReserveNavShown: false,
      Observer: null
    }
  },
  mounted() {
    eventBus.emit('toggleLayout', true)
    window.scrollTo(0, 0);
  },
  async created() {
    await this.setStay()
    if (this.rating > 4.6 && this.stay.reviews.length > 3) this.isSuperHost = true
    this.ScrollTrigger()
  },
  computed:{
    IsOpenedReserveMobile(){
      return this.$store.getters.isOpenReserveMobile
    }
  },
  methods: {
    ScrollTrigger() {
      this.Observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === document.querySelector('.stay-details-imgs-container')) {
            this.isDetailsNavShown = entry.isIntersecting ? false : true
          } else {
            this.isReserveNavShown = entry.isIntersecting ? false : true
          }
        }
        )
      }, { rootMargin: "-80px 0px 0px" })
      document.querySelectorAll('.scroll-trigger').forEach((el) => {
        this.Observer.observe(el);
      })
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
    unmounted() {
      this.Observer.unobserve(document.querySelectorAll('.scrollTrigger'))
    },
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
    mobileFooter,
    mobileHeaderDetails,
    navDetails
  }
}
</script>