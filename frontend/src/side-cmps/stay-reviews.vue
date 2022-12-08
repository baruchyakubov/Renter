<template >
  <div v-if="stay" class="stay-details-reviews">
    <h3><img class="star" src="../assets/svg/review-start-svg.svg" />{{ rating }}<span class="bullet">•</span>{{ reviews}}</h3>
    <div class="previewContainer">
    <div v-for="review in stay.reviews" class="reviewPreview">
      <div class="flex-box">
        <img class="reviewerImg" :src="review.by.imgUrl" />
        <div>
          <h4>{{ review.by.fullname }}</h4>
        </div>
      </div>
      <p class="reviewInsight">{{ review.txt }}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "stay-details-reviews",
  created(){
    const date = this.stay.reviews[0].at
    console.log(this.stay.reviews[0].at);
  },
  props: {
    stay: Object,
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