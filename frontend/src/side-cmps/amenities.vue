<template>
  <section class="stay-details-amenities-section">
    <h3>What this place offers</h3>
    <div class="container flex-box">
      <div v-for="index in 10" :key="index" class="item"> 
        <p><img  class="svgImg" v-bind:src="amenities[index].img"/>{{ amenities[index].txt }}</p>
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
        {txt:'Air conditioning',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670852474/uppti3q3c2yptfmy7o0t.svg'},
        {txt:'Coffee',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853252/lmzwvb8ehs4w0qlvpgs3.svg'},
        {txt:'Dining table',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853301/iqnpii95j7ofjamdg9sw.svg'},
        {txt:'Hammock',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853332/mo4obvlmbvliol0wfrt2.svg'},
        {txt:'Hangers',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853364/yrh5ymbwyyhwqfcxdgnk.svg'},
        {txt:'Heating',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853401/z021xb1cz55w9kf7ywgv.svg'},
        {txt:'Kitchen',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853444/ocvnhizvby8ki2kgtanw.svg'},
        {txt:'Microwave',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853470/nqnrxwidve3uey7ypmkr.svg'},
        {txt:'Patio or balcony',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853497/byyz5enzrxnzniidss24.svg'},
        {txt:'Smoke alarm',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853524/ww410nyw9dngmbyex1uu.svg'},
        {txt:'Toaster',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853690/aoamy1jm29d51ltx4fcc.svg'},
        {txt:'Tv',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853585/l14vcccsidt1golsv0nu.svg'},
        {txt:'Washer',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853720/pwfi0ktkd5uzgo3wpoxl.svg'},
        {txt:'Wifi',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853752/e8aotf4ikvli2rfsbre8.svg'},
        {txt:'Wine glasses',img:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670853792/wrxmhtafr4ou5iecgyg5.svg'}
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