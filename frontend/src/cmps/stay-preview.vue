<template>
  <section @click="goToDetails" class="stay-preview" v-if="stay">
    <images-carusel :stay=stay style=" border-radius: 1.7vh; " :images="stay.imgUrls" :loop="false"></images-carusel>
    <section style="padding:0; margin-top: 10px;" class="flex-box space-between">
      <div class="details">
        <h1>{{ stay.name }}</h1>
        <p>{{stay.summary}}</p>
        <p>{{stay.loc.country}},{{stay.loc.city}}</p>
        <p class="price-preview"> ${{ stay.price?.toLocaleString() }} <span>night</span></p>
      </div>
      <div class="rating">
        <p><span class="stay-rating">★ {{ rating }}</span>  (<span class="reviews-length">{{stay.reviews.length}}</span>)</p>
      </div>
    </section>
  </section>
</template>

<script>
import imagesCarusel from './images-carusel.vue';
export default {
  name: "stay-preview",
  props: {
    stay: Object
  },
  methods: {
    goToDetails() {
      this.$router.push(`stay/${this.stay._id}`)
    }
  },
  computed: {
    rating() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 4)
      if (average === 4 || average === 5 || average === 3) return average + '.0'
      else return average
    }
  },

  components: {
    imagesCarusel
  }
}
</script>


