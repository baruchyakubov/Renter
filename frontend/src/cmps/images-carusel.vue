<template>
  <el-carousel interval="999999999" indicator-position="inside" v-if="stay">
    <svg :id="stay._id" @click.prevent="saveStay($event,stay._id)" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="position: absolute; z-index: 20; left: 95%; top: 5%; transform: translate(-95% , -5%);  display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>
    <el-carousel-item v-for="image in images" :key="image">
      <img class="preview-img" :src="image" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { showSuccessMsg } from '../services/event-bus.service'
export default {
  name: 'carousel',
  props:{
      images:Array,
      stay:Object
  },
  created(){
    console.log(this.stay.loc.address);
  },
  methods:{
    saveStay(e,stayId){
      e.stopPropagation()
      document.getElementById(`${this.stay._id}`).style.fill ='red'
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)) 
      user.wishList.push(this.stay._id)
      this.$store.dispatch({type:"updateUser",user})
      showSuccessMsg('Added stay to wishlist')
    }
  }
}
</script>





  
  