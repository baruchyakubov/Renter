<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" editable:false range-separator="" start-placeholder="CHECK-IN"
        end-placeholder="CHECKOUT" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'calendarCMP',
  data() {
    return {
      value1: '',
      dates:{from:'',to:''}
    }
  },
  methods: {
    show() {
      this.formatDate()
      console.log(this.value1)
    },
    formatDate() {
      let newArr = []
      this.value1.forEach(item => {
        var d = item
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
        var year = d.getFullYear()

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        newArr.push([day, month, year].join('/'))
      })
      this.dates.from = newArr[0]
      this.dates.to = newArr[1]
      this.$emit('sendDates',this.dates)
    }
  },
  watch: {
    value1(newVal, oldVal) {
        this.formatDate()
        console.log(this.dates)
    }
  },
  computed: {
  }

}

// const shortcuts = [
//   {
//     text: 'Last week',
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
//       return [start, end]
//     },
//   },
//   {
//     text: 'Last month',
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
//       return [start, end]
//     },
//   },
//   {
//     text: 'Last 3 months',
//     value: () => {
//       const end = new Date()
//       const start = new Date()
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
//       return [start, end]
//     },
//   },
// ]
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>