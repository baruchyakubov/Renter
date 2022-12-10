<template >
  <div v-if="stay" class="stay-details-reviews">
    <h3><img class="star" src="../assets/svg/review-start-svg.svg" />{{ rating }}<span class="bullet">•</span>{{ reviews}}</h3>
    <div class="previewContainer">
    <div v-for="review,idx in stay.reviews.slice(0,6)" class="reviewPreview">
      <div class="flex-box">
        <img class="reviewerImg" :src="review.by.imgUrl" />
        <div>
          <h4>{{ review.by.fullname }}</h4>
          <h5 class="reviewTime">{{month()}} {{year()}}</h5>
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
    // console.log(this.stay.reviews[0].at.getMonth());
  },
  props: {
    stay: Object,
  },
  methods:{
   
  },
  methods:{
    month() {
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      let currMonth = months[Math.floor(Math.random()*12)]
      return currMonth
    },
    year(){
      let months = ['2015','2016','2017','2018','2019','2020','2022','2021']
      let currMonth = months[Math.floor(Math.random()*8)]
      return currMonth
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