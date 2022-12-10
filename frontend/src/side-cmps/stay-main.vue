<template>
  <div v-if="stay">
    <h2 class="stay-details-name">{{ stay.name }}</h2>
    <div class="headerFlex flex-box">
      <div class="stay-details-basicInfo">
        <p><img class="star" src="../assets/svg/review-start-svg.svg">{{ rating }} <span class="bullet">•</span></p>
        <p class="reviews">{{ reviews }}</p>
        <p v-if="isSuperHost"><span class="bullet">•</span> Superhost</p>
        <p class="location"><span class="bullet">•</span> <span>{{ stay.loc.address }}, {{ stay.loc.city }},
            {{ stay.loc.country }}</span></p>
      </div>
      <div class="saveShare flex-box">
        <p><share-svg></share-svg> <span>Share</span></p>
        <p @click="saveStay"><save-svg></save-svg> <span>Save</span></p>
      </div>
    </div>
    <div class="stay-details-imgs-container">
      <img v-for="(img, idx) in imgsToRender" :src="img" :class="'stay-details-img' + idx" />
    </div>
  </div>
</template>
<script>
import shareSvg from '../side-cmps/shareSvg.vue'
import saveSvg from '../side-cmps/saveSvg.vue'
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
  methods: {
    saveStay(e){
      e.stopPropagation()
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)) 
      user.wishList.push(this.stay._id)
      this.$store.dispatch({type:"updateUser",user})
      showSuccessMsg('Added stay to wishlist')
    },
    isSuper() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().substring(0, 3)
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
    saveSvg,
    shareSvg
  }
}
</script>
<style>

</style>