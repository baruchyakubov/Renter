<template>
  <section class="mobile-filter">
    <div class="top-filter">
        <close-btn @click="$emit('closeMobileFilter')" class="closeBtn"></close-btn>
    </div>
    <section class="main-mobile-filter">
        <mobile-country-search @setActiveFilter="setActiveFilter" :activeFilter="activeFilter"></mobile-country-search>
        <mobile-calender-filter @setActiveFilter="setActiveFilter" :activeFilter="activeFilter"></mobile-calender-filter>
        <mobile-guest-filter @setActiveFilter="setActiveFilter" :activeFilter="activeFilter"></mobile-guest-filter>
    </section>
  </section>
</template>

<script>
import closeBtn from './amenities-x.vue';
import mobileCountrySearch from './mobile-country-search.vue'
import mobileCalenderFilter from './mobile-calender-filter.vue';
import mobileGuestFilter from './mobile-guest-filter.vue'

export default {
components:{
    closeBtn,
    mobileCountrySearch,
    mobileCalenderFilter,
    mobileGuestFilter
},
methods:{
    setActiveFilter(activeFilter){
        console.log(activeFilter);
        this.$store.commit({ type: 'setActiveFilter', activeFilter})
    }
},
computed:{
    activeFilter(){
        return this.$store.getters.activeMobileFilter
    }
}
}
</script>

<style>

</style>