<template>
  <section class="stay-filter mainContainer">
      <filter-carousel @setFilterByLabel="setFilterByLabel" :filters="filters"></filter-carousel> 
  </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import filterCarousel from './filter-carousel.vue';
export default {
  data(){
    return{
      filters:[{name:'New' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595632/ibufiq6z0vj5kq4dhyxs.png'}, {name:'Top of the world' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595654/kqwmmgdvmwv4xu4gfq6z.png'},
      {name:'Trending' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595678/kotmjy6tgonwt4wybjoj.png'},{name:'Adapted' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595705/w08nla69ppuga3rksqvp.png'},
      {name:'Play' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595736/vsnml1uldjcq2ymqrvcd.png'},{name:'Private rooms' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595755/xzbyyee7t21rdgti9ppb.png'},
      {name:'OMG!' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595774/oyfrhvsmhlcmf5mzrpzb.png'},{name:'Amazing views' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595800/fosfqnjervtxbooseyuf.png'},
      {name:'Cabins' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595822/hagy7vvw2ls5flm4n2w6.png'},{name:'Castles' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595843/ats1zakdilbihgtek765.png'},
      {name:'Mansions' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595863/aoljpop1t8xyr5yrdpvv.png'},{name:'Iconic cities' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595893/nzetygmqxwmekwmwx4g3.png'},
      {name:'Design' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595913/hid9dlqavfztfnhsuafz.png'},{name:'Tropical' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595931/szvi8yz2nziimjh1r1dm.png'},
      {name:'Treehouses' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595955/hjg4g97owsmvpwbpgem0.png'} , {name:'Tiny homes' , icon:'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595978/q8wkbsbs1xq8xx1rnkfu.png'}]
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




