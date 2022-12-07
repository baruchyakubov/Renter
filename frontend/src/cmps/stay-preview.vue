<template>
  <section @click="goToDetails" class="stay-preview" v-if="stay">
    <images-carusel style=" border-radius: 1.7vh; " :images="stay.imgUrls" :loop="false"></images-carusel>
    <section style="padding:0; margin-top: 10px;" class="flex-box space-between">
      <div class="details">
        <h1>{{ stay.name }}</h1>
        <p>Added 3 weeks ago</p>
        <p>Jan 14 - 19</p>
        <p class="price-preview"> ${{ stay.price?.toLocaleString() }} <span>night</span></p>
      </div>
      <div class="rating">
        <p>★ {{ rating }}</p>
      </div>
    </section>
    <!-- <button @click="removeStay(stay._id)">x</button>
        <button @click="updateStay(stay)">Update</button>
        <button @click="addStayMsg(stay._id)">Add stay msg</button>
        <button @click="printStayToConsole(stay)">Print msgs to console</button> -->
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
      const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 3)
      if (average === 4 || average === 5 || average === 3) return average + '.0'
      else return average
    }
  },

  components: {
    imagesCarusel
  }
}
</script>


