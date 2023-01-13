<template>
  <el-carousel interval="999999999" indicator-position="inside" v-if="stay">
    <svg :class="{red: isInWishlist}" v-if="$route.path === '/'" :id="stay._id" @click.prevent="saveStay($event, stay._id)" viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"
      style="position: absolute; z-index: 20; left: 95%; top: 5%; transform: translate(-95% , -5%);  display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
      <path
        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
      </path>
    </svg>
    <el-carousel-item v-for="image in images" :key="image">
      <img class="preview-img" :src="image" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { authService } from '../services/auth.service';
export default {
  name: 'carousel',
  props: {
    images: Array,
    stay: Object
  },
  data(){
    return {
      isInWishlist: false
    }
  },
  mounted() {
    const user = authService.getLoggedinUser()
    if(this.$route.path === '/' && user){
      const stay = user.wishList.find(stay => {
         return this.stay._id === stay._id
      })
      if(stay) this.isInWishlist = true
    }
  },
  methods: {
    async saveStay(e, stayId) {
      e.stopPropagation()
      const user = authService.getLoggedinUser()
      if(!user){
        showErrorMsg('Login required')
        return
      }
      const isExcised = user.wishList.find(stay => {
        return stay._id === stayId
      })
      if (isExcised) {
        const idx = user.wishList.findIndex(stay => {
          return stay._id === this.stay._id
        })
        user.wishList.splice(idx , 1)
        await this.$store.dispatch({ type: "updateUser", user: { ...user } })
        this.isInWishlist = false
        showSuccessMsg('removed successfully wishlist')
        return
      }
      this.isInWishlist = true
      const stay = {
        _id: this.stay._id,
        name: this.stay.name,
        imgUrls: this.stay.imgUrls,
        summary: this.stay.summary,
        loc: {
          country: this.stay.loc.country,
          city: this.stay.loc.city
        },
        price: this.stay.price,
        reviews: this.stay.reviews
      }
      user.wishList.push(stay)
      await this.$store.dispatch({ type: "updateUser", user: { ...user } })
      showSuccessMsg('Added stay to wishlist')
    }
  }
}
</script>






