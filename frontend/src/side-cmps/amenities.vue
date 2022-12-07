<template>
  <section class="stay-details-amenities-section">
    <h3>What this place offers</h3>
    <div class="container flex-box">
      <p v-for="index in 10" :key="index" class="item"> 
        {{ amenities[index] }}
      </p>
    </div>
    <button class="amenitiesBtn" @click="openModal">Show all {{amenities.length}} amenities</button>
    <amenities-modal v-if="isModalShown" :amenities="amenities" @closeModal="closeModal"/>
  </section>
</template>
<script>
import amenitiesModal from './amenities-modal.vue'
export default {
  props: {
    amenities: Object
  },
  data(){
    return{
      isModalShown:false
    }
  },
  created(){
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