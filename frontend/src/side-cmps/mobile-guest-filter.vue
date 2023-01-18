<template>
  <section class="mobile-guest-filter">
    <div v-if="activeFilter !== 'mobileGuestFilter'" @click="$emit('setActiveFilter', 'mobileGuestFilter')"
      class="preview-filter flex-box space-between">
      <span class="first">Who</span>
      <span v-if="!totalGuestsCount" class="second">Add guests</span>
      <span v-else class="second">{{ totalGuestsCount }} guests</span>
    </div>
    <div v-else class="guests-search active">
      <div>Who's coming?</div>
      <guest-modal @increment="increment" @decrement="decrement" :counter="counter"></guest-modal>
    </div>
  </section>
</template>

<script>
import guestModal from '../side-cmps/search-guest-modal.vue'

export default {
  data() {
    return {

    }
  },
  methods: {
    increment(guestType) {
      this.$emit('increment', guestType)
    },
    decrement(guestType) {
      this.$emit('decrement', guestType)
    },
  },
  computed: {

  },
  props: {
    activeFilter: String,
    counter: Object,
    totalGuestsCount: Number
  },
  components: {
    guestModal
  }
}
</script>