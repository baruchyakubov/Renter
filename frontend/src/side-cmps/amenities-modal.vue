<template>
  <div class="amenitiesModal">
    <close-btn class="closeBtn" @click="closeModal"></close-btn>
    <h3>What this place offers</h3>
    <div class="container flex-box">
      <div v-for="item in amenities" :key="item" class="item"> 
        <img class="imgSvg" :src='"/src/assets/svg/"+item.img+".svg"'>
        <p>{{ item.txt }}</p>
      </div>
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