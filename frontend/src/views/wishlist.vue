<template>
  <div class="wishlist detailsContainer" v-if="userStays">
    <h1 class="title">Wishlists</h1>
    <div class="flexContainer">
      <div v-for="stay in userStays">
        <stay-preview  :stay="stay"></stay-preview>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import stayPreview from '../cmps/stay-preview.vue';
import { stayService } from '../services/stay.service';
export default {
  data() {
    return {
      wishlist: null,
      userStays:[]
    }
  },
  async created() {
    eventBus.emit('toggleLayout', true)
    this.setWishlist()
    await this.getStays()
    console.log(this.userStays);
  },
  methods: {
    setWishlist(){
      let user = JSON.parse(JSON.stringify(this.currUser))
      this.wishlist = user.wishList
    },
    async getStays(){
      this.wishlist.forEach(async (wish) =>{
        let stay = await stayService.getById(wish)
        this.userStays.push(stay)
      })
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
