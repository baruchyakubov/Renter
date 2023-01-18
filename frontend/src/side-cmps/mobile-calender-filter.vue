<template>
  <section class="mobile-calendar-filter">
    <div v-if="activeFilter !== 'mobileCalenderFilter'" @click="$emit('setActiveFilter', 'mobileCalenderFilter')"
      class="preview-filter flex-box space-between">
      <span class="first">When</span>
      <span v-if="!dates.from && !dates.to" class="second">Add dates</span>
      <span v-else class="second">{{ dateFormat }}</span>
    </div>
    <div v-else class="dates-search active">
      <div>When's your trip?</div>
      <div class="dates">
        <div>
          <label for="">Add start date:</label>
          <input @input="setStartDate" value="dates.from" type="date">
        </div>
        <div>
          <label for="">Add end date:</label>
          <input @input="setEndDate" value="dates.to" type="date">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    activeFilter: String,
    dates: Object
  },
  data() {
    return {
      Dates: { from: '', to: '' }
    }
  },
  methods: {
    setStartDate(el) {
      const date = new Date(el.target.value)
      this.Dates.from = date.toLocaleDateString().split('.')
      if (+this.Dates.from[1] < 10) {
        this.Dates.from[1] = '0' + this.Dates.from[1]
      }
      if (+this.Dates.from[0] < 10) {
        this.Dates.from[0] = '0' + this.Dates.from[0]
      }
      this.Dates.from = [this.Dates.from[1], this.Dates.from[0], this.Dates.from[2]]
      this.Dates.from = this.Dates.from.join('/')
      if (this.Dates.to) this.$emit('setDates', { ...this.Dates })
    },
    setEndDate(el) {
      const date = new Date(el.target.value)
      this.Dates.to = date.toLocaleDateString().split('.')
      if (+this.Dates.to[1] < 10) {
        this.Dates.to[1] = '0' + this.Dates.to[1]
      }
      if (+this.Dates.to[0] < 10) {
        this.Dates.to[0] = '0' + this.Dates.to[0]
      }
      this.Dates.to = [this.Dates.to[1], this.Dates.to[0], this.Dates.to[2]]
      this.Dates.to = this.Dates.to.join('/')
      if (this.Dates.from) this.$emit('setDates', { ...this.Dates })
    }
  },
  computed: {
    dateFormat() {
      var arrStart = this.dates.from.split('/')
      var arrEnd = this.dates.to.split('/')
      const event = new Date(Date.UTC(arrStart[2], arrStart[1], arrStart[0]))
      const options = { month: 'short', day: 'numeric' };
      if (arrStart[1] === arrEnd[1]) {
        return event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[0]
      } else {
        const event2 = new Date(Date.UTC(arrEnd[2], arrEnd[1], arrEnd[0]))
        const options2 = { month: 'short', day: 'numeric' };
        return event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
      }
    }
  }
}
</script>