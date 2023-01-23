<template>
  <div>
    <div class="date-picker-mobile">
      <div class="date-input">
        <label>CHECK-IN</label>
        <input type="text" @input="setStartDate" :value="dates.from" class="mobile-date-input check-in">
      </div>
      <div class="date-input">
        <label>CHECKOUT</label>
        <input type="text" @input="setEndDate" :value="dates.to" class="mobile-date-input check-out">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dates: Object
  },
  data() {
    return {
      Dates: { from: '', to: '' }
    }
  },
  mounted(){
    setTimeout(() => {
      console.log(this.dates)
    }, 1000);
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
    // dateFormat() {
    //   var arrStart = this.dates.from.split('/')
    //   var arrEnd = this.dates.to.split('/')
    //   const event = new Date(Date.UTC(arrStart[2], arrStart[1], arrStart[0]))
    //   const options = { month: 'short', day: 'numeric' };
    //   if (arrStart[1] === arrEnd[1]) {
    //     return event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[0]
    //   } else {
    //     const event2 = new Date(Date.UTC(arrEnd[2], arrEnd[1], arrEnd[0]))
    //     const options2 = { month: 'short', day: 'numeric' };
    //     return event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
    //   }
    // },
    datesTo(){
      return this.dates
    }
  }
}
</script>
<style>
  
</style>