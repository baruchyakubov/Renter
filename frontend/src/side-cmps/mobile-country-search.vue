<template>
  <section class="mobile-country-search">
    <div v-if="activeFilter !== 'mobileCountrySearch'" @click="$emit('setActiveFilter' , 'mobileCountrySearch')" class="preview-filter flex-box space-between">
      <span class="first">Where</span>
      <span class="second">I'm flexible</span>
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