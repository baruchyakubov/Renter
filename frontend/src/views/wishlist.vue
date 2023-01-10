<template>
  <div class="wishlist detailsContainer" v-if="userStays">
    <h1 class="title">Wishlists</h1>
    <div class="flexContainer">
      <div v-for="stay in userStays" :key="stay._id">
        <stay-preview  :stay="stay"></stay-preview>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import stayPreview from '../cmps/stay-preview.vue';
export default {
  data() {
    return {
      wishlist: null,
      userStays:[]
    }
  },
   created() {
    eventBus.emit('toggleLayout', true)
    this.setWishlist()
  },
  methods: {
    setWishlist(){
      let user = JSON.parse(JSON.stringify(this.currUser))
      this.userStays = user.wishList
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedinUser
    }
  },
  components:{
    stayPreview
  }
}
</script>
