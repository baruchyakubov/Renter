<template>
  <section class="stay-details-amenities-section">
    <h3>What this place offers</h3>
    <div class="container flex-box">
      <div v-for="index in 10" :key="index" class="item"> 
        <p><img  class="svgImg" v-bind:src='"/src/assets/svg/"+amenities[index].img+".svg"'/>{{ amenities[index].txt }}</p>
      </div>
    </div>
    <button class="amenitiesBtn" @click="openModal">Show all {{amenities.length}} amenities</button>
    <amenities-modal v-if="isModalShown" :amenities="amenities" @closeModal="closeModal"/>
  </section>
</template>
<script>
import amenitiesModal from './amenities-modal.vue'
export default {
  // props: {
  //   amenities: Object
  // },
  data(){
    return{
      isModalShown:false,
      amenities:[
        {txt:'Air conditioning',img:'Air-conditioning'},
        {txt:'Coffee',img:'Coffee'},
        {txt:'Dining table',img:'dining-table'},
        {txt:'Hammock',img:'Hammock'},
        {txt:'Hangers',img:'Hangers'},
        {txt:'Heating',img:'Heating'},
        {txt:'Kitchen',img:'Kitchen'},
        {txt:'Microwave',img:'Microwave'},
        {txt:'Patio or balcony',img:'Patio'},
        {txt:'Smoke alarm',img:'Smoke-alarm'},
        {txt:'Toaster',img:'Toaster'},
        {txt:'Tv',img:'Tv'},
        {txt:'Washer',img:'Washer'},
        {txt:'Wifi',img:'Wifi'},
        {txt:'Wine glasses',img:'Wine-glasses'}
    ]
    }
  },
  created(){
    console.log(typeof this.amenities[0].svg);
  },
  methods:{
    closeModal(){
      this.isModalShown = false
    },
    openModal(){
      this.isModalShown = true
    }
  },
  computed: {
    amenitiesLength(){
      return this.amenities.length
    }
  },
  components:{
    amenitiesModal
  }
}
</script>
<style>

</style>