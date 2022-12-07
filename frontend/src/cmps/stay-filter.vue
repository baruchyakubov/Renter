<template>
  <section class="stay-filter main-container">
      <filter-carousel @setFilterByLabel="setFilterByLabel" :filters="filters"></filter-carousel> 
  </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import filterCarousel from './filter-carousel.vue';
export default {
  data(){
    return{
      filters:[{name:'New' , icon:'public/New.jpg'}, {name:'Top of the world' , icon:'public/top-of-the-world.jpg'},
      {name:'Trending' , icon:'public/Trending.jpg'},{name:'Adapted' , icon:'public/Adapted.jpg'},
      {name:'Play' , icon:'public/Play.jpg'},{name:'Private rooms' , icon:'public/Private-rooms.jpg'},
      {name:'OMG!' , icon:'public/OMG.jpg'},{name:'Amazing views' , icon:'public/Amazing-views.jpg'},
      {name:'Cabins' , icon:'public/Cabins.jpg'},{name:'Castles' , icon:'public/Castles.jpg'},
      {name:'Mansions' , icon:'public/Mansions.jpg'},{name:'Iconic cities' , icon:'public/Iconic-cities.jpg'},
      {name:'Design' , icon:'public/Design.jpg'},{name:'Tropical' , icon:'public/Tropical.jpg'},
      {name:'Treehouses' , icon:'public/Treehouses.jpg'} , {name:'Tiny homes' , icon:'public/Tiny-homes.jpg'}]
    }
  },
  methods:{
    setFilterByLabel(label){
      eventBus.emit('setFilterByLabel' , label)
    },
  },
  components:{
    filterCarousel
  }
}
</script>




