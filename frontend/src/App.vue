
<template>
  <section class="main-app">
       <app-header />
       <router-view></router-view>
   </section>

</template>

<script>
import appHeader from './cmps/app-header.vue';

export default{
  created(){
    this.$store.dispatch({ type: 'loadToys'})
  },
  components:{
  appHeader,
}
}
</script>




