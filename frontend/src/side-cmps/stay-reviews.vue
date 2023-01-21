<template >
  <div ref="reviews" v-if="stay" class="stay-details-reviews">
    <h3><img class="star" src="../assets/svg/review-start-svg.svg" />{{ rating }}<span class="bullet">•</span>{{
      reviews
    }}</h3>
    <div class="previewContainer">
      <div v-for="review, idx in reviewsCount" :key="review + idx" class="reviewPreview">
        <review-preview :review="review"></review-preview>
      </div>
    </div>
    <button v-if="reviewsCount !==stay.reviews" class="reviewsBtn" @click="toggleReviewsCount">Show all {{ stay.reviews.length }} reviews</button>
    <button v-else class="reviewsBtn" @click="toggleReviewsCount">Show less reviews</button>
  </div>
</template>\

<script>
import reviewPreview from './review-preview.vue'

export default {
  name: "stay-details-reviews",
  props: {
    stay: Object,
  },
  data(){
    return {
      reviewsCount: this.stay.reviews.slice(0, 6)
    }
  },
  methods:{
    toggleReviewsCount(){
      if(this.reviewsCount.length === 6) this.reviewsCount = this.stay.reviews
      else this.reviewsCount = this.stay.reviews.slice(0, 6)
    }
  },
  computed: {
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
  components:{
    reviewPreview
  }
}
</script>
