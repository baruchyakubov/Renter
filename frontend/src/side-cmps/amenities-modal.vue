<template>
  <div class="amenitiesModal">
    <close-btn class="closeBtn" @click="closeModal"></close-btn>
    <h3>What this place offers</h3>
    <div class="container flex-box">
      <p v-for="item in amenities" :key="item" class="item"> 
        {{ item }}
      </p>
    </div>
  </div>
</template>
<script>
import closeBtn from './amenities-x.vue'
export default {
  name:'amenities-modal',
  props:{
    amenities:Array
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    amenitySvg(item){
      return item
    }
  },
  created(){
    console.log(this.amenities);
  },
  components:{
    closeBtn
  }
}
</script>
<style lang="">
  
</style>