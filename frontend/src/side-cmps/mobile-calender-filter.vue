<template>
  <section class="mobile-calendar-filter">
    <div class="preview-filter flex-box space-between">
      <span class="first">When</span>
      <span class="second">Add dates</span>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    activeFilter() {
      return this.$store.getters.activeMobileFilter
    }
  }
}
</script>

<style>

</style>