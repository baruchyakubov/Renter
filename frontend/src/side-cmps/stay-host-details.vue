<template>
    <div class="stay-details-host flex-box">
      <div>
        <h2 class="hostedBy">House hosted by {{ stay.host.fullname }}</h2>
        <div class="capacities">
          <h2 class="capacity guest-capacity">{{ stay.capacity }} guests <span class="bullet">•</span></h2>
          <h2 class="capacity bedrooms-capacity">{{ stay.bedrooms }} bedrooms <span class="bullet">•</span>
          </h2>
          <h2 class="capacity beds-capacity">{{ beds }} beds <span class="bullet">•</span></h2>
          <h2 class="capacity baths-capacity">{{ stay.bathrooms }} baths</h2>
        </div>
      </div>
      <div>
        <img class="host-picture" v-bind:src="stay.host.pictureUrl" />
        <host-svg class="hostSvg" v-if="isSuperHost"></host-svg>
      </div>
    </div>
</template>
<script>
import hostSvg from '../side-cmps/superHostSvg.vue'
export default {
  name:'host-details-sideCmp',
  props: {
    stay: Object
  },
  created() {
    this.isSuperHost = this.isSuper()
  },
  data(){
    return{
      isSuperHost: false
    }
  },
  methods:{
    isSuper() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().substring(0,3)
      if (average > 4) return true
      else return false
    }
  },
  computed: {
    beds() {
      return this.stay.bedrooms*2
    },
    imgsToRender() {
      return this.stay.imgUrls.slice(0, 5)
    },
    reviews() {
      if (this.stay.reviews.length === 1) return '1 review'
      else return `${this.stay.reviews.length} reviews`
    },
    rating() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 3)
      if (average === 4 || average === 5 || average === 3) return average + '.0'
      else return average
    }
  },
  components: {
    hostSvg
  }
}
</script>
