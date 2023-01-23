<template>
  <div>
    <div v-if="isSetingDate" class="date-picker-mobile">
      <div class="date-input">
        <label>CHECK-IN</label>
        <input type="date" @input="setStartDate" v-model="Dates.from" class="mobile-date-input check-in">
      </div>
      <div class="date-input">
        <label>CHECKOUT</label>
        <input type="date" @input="setEndDate" v-model="Dates.to" class="mobile-date-input check-out">
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
      Dates: { from: 'yyyy-MM-dd', to: 'yyyy-MM-dd' },
      startDate: null,
      endDate: null,
      isSetingDate: false
    }
  },
<<<<<<< HEAD
  mounted(){
    setTimeout(() => {
      console.log(this.dates)
    }, 1000);
=======
  mounted() {
    console.log(this.dates.from);
    if (!this.dates.from || !this.dates.to) {
      this.isSetingDate = true
    } else {
      const tempArrStart = this.dates.from.split('/')
      const arrStart = [tempArrStart[2], tempArrStart[0], tempArrStart[1]]
      this.Dates.from = arrStart.join('-')
      const tempArrEnd = this.dates.to.split('/')
      const arrEnd = [tempArrEnd[2], tempArrEnd[0], tempArrEnd[1]]
      this.Dates.to = arrEnd.join('-')
      this.isSetingDate = true
    }
>>>>>>> 0a0bc3ac4a3796bff0a6554fded9de1bafb765a7
  },
  methods: {
    setStartDate(el) {
      const date = new Date(this.Dates.from)
      this.startDate = this.setDateFormat(date)
      console.log(this.Dates.from);
      if (this.endDate) this.$emit('sendDates', {from:this.startDate , to:this.endDate} )
    },
    setEndDate(el) {
      const date = new Date(this.Dates.to)
      this.endDate = this.setDateFormat(date)
      if (this.startDate) this.$emit('sendDates', {from:this.startDate , to:this.endDate})
    },
    setDateFormat(date) {
      let Date = date.toLocaleDateString().split('.')
      if (+Date[1] < 10) {
        Date[1] = '0' + Date[1]
      }
      if (+Date[0] < 10) {
        Date[0] = '0' + Date[0]
      }
      Date = [Date[1], Date[0], Date[2]]
      Date = Date.join('/')
      return Date
    }
  }
}
</script>
<style>

</style>