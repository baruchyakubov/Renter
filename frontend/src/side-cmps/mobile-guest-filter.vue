<template>
  <section class="mobile-guest-filter">
    <div v-if="activeFilter !== 'mobileGuestFilter'" @click="$emit('setActiveFilter' , 'mobileGuestFilter')" class="preview-filter flex-box space-between">
      <span class="first">Who</span>
      <span class="second">Add guests</span>
    </div>
    <div v-else class="country-search-active">
      <h1>active</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    activeFilter : String
  }
}
</script>

<style>

</style>