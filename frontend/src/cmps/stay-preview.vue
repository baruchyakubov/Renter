<template>
  <section @click="goToDetails" class="stay-preview" v-if="stay">
    <images-carusel :isInWishlist="isInWishlist" @saveStay="saveStay" :stay=stay style=" border-radius: 1.7vh; "
      :images="stay.imgUrls" :loop="false"></images-carusel>
    <section style="padding:0; margin-top: 10px;" class="flex-box space-between">
      <div class="details">
        <h1>{{ stay.name }}</h1>
        <p>{{ stay.summary }}</p>
        <p>{{ stay.loc.country }},{{ stay.loc.city }}</p>
        <p class="price-preview"> ${{ stay.price?.toLocaleString() }} <span>night</span></p>
      </div>
      <div class="rating">
        <p><span class="stay-rating">★ {{ rating }}</span> (<span class="reviews-length">{{
          stay.reviews.length
        }}</span>)
        </p>
      </div>
    </section>
  </section>
</template>

<script>
import imagesCarusel from './images-carusel.vue';
import { authService } from '../services/auth.service';
import { stayService } from '../services/stay.service';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

export default {
  name: "stay-preview",
  data() {
    return {
      isInWishlist: false
    }
  },
  props: {
    stay: Object
  },
  mounted() {
    if (this.$route.path === '/' && this.currUser) {
      const stay = stayService.checkIfIsInWishlist(this.currUser.wishList, this.stay)
      if (stay) this.isInWishlist = true
    }
  },
  methods: {
    goToDetails() {
      this.$router.push(`stay/${this.stay._id}`)
    },
    async saveStay() {
      const user = authService.getLoggedinUser()
      if (!user) {
        showErrorMsg('Login required')
        return
      }
      const isExcised = stayService.checkIfIsInWishlist(this.currUser.wishList, this.stay)
      if (isExcised) {
        const User = stayService.removeFromWishList(user, this.stay)
        await this.$store.dispatch({ type: "updateUser", user: { ...User } })
        this.isInWishlist = false
        showSuccessMsg('removed successfully wishlist')
        return
      }
      this.isInWishlist = true
      const stay = stayService.getEmptyWishlistStay(this.stay)
      user.wishList.push(stay)
      await this.$store.dispatch({ type: "updateUser", user: { ...user } })
      showSuccessMsg('Added stay to wishlist')
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
    },
    currUser() {
      return this.$store.getters.loggedinUser
    }
  },
  watch: {
    currUser() {
      if (!this.currUser) this.isInWishlist = false
      else {
        const stay = stayService.checkIfIsInWishlist(this.currUser.wishList, this.stay)
        if (stay) this.isInWishlist = true
      }
    }
  },
  components: {
    imagesCarusel
  }
}
</script>


