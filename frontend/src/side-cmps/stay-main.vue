<template>
  <div v-if="stay">
    <h2 class="stay-details-name">{{ stay.name }}</h2>
    <div class="stay-details-basicInfo">
      <p><img class="star" src="../assets/svg/review-start-svg.svg">{{ rating }} <span class="bullet">•</span></p>
      <p class="reviews">{{ reviews }}</p>
      <p><span class="bullet">•</span> Superhost</p>
      <p class="location"><span class="bullet">•</span> <span>{{ stay.loc.address }}, {{ stay.loc.city }},
          {{ stay.loc.country }}</span></p>
    </div>
    <div class="stay-details-imgs-container">
      <img v-for="(img, idx) in imgsToRender" :src="img" :class="'stay-details-img' + idx" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stay: Object
  },
  data() {
    return {
      isSuperHost: false
    }
  },
  created() {
    this.isSuperHost = this.isSuper()
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
      return this.stay.capacity.bedrooms * 2
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
  }
}
</script>
<style>

</style>