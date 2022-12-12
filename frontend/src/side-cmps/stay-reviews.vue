<template >
  <div v-if="stay" class="stay-details-reviews">
    <h3><img class="star" src="../assets/svg/review-start-svg.svg" />{{ rating }}<span class="bullet">•</span>{{ reviews}}</h3>
    <div class="previewContainer">
    <div v-for="review,idx in stay.reviews.slice(0,6)" class="reviewPreview">
      <div class="flex-box">
        <img class="reviewerImg" :src="review.by.imgUrl" />
        <div>
          <h4>{{ review.by.fullname }}</h4>
          <h5 class="reviewTime"> {{year(review)}} {{month(review)}}</h5>
        </div>
      </div>
      <p class="reviewInsight">{{ review.txt }}</p>
    </div>
    <button class="reviewsBtn" @click="openModal">Show all {{stay.reviews.length}} reviews</button>
  </div>
</div>
</template>
<script>
export default {
  name: "stay-details-reviews",
  created(){
    const date = this.stay.reviews[0].at
  },
  props: {
    stay: Object,
  },
  methods:{
   
  },
  methods:{
    month(review) {
      let month = +review.at.substring(5,7)
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      let currMonth = months[month]
      return currMonth
    },
    year(review){
      return review.at.substring(0,4)
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
  }
}
</script>
<style >

</style>