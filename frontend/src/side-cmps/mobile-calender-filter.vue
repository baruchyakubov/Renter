<template>
  <section class="mobile-calendar-filter">
    <div v-if="activeFilter !== 'mobileCalenderFilter'" @click="$emit('setActiveFilter' , 'mobileCalenderFilter')" class="preview-filter flex-box space-between">
      <span class="first">When</span>
      <span class="second">Add dates</span>
    </div>
    <div v-else class="country-search active">
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