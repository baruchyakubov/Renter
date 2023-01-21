<template>
  <section v-if="stay">
    <reserve-form :stay="stay" class="wholeOrderMobile"/>
    <div class="mobile-footer">
      <div class="details">
        <h4 class="price">{{ price }} <span>night</span></h4>
        <span class="dates" v-if="session.dates.to">{{ month }} {{ startDate }} - {{ endDate }}</span>
      </div>
      <reactive-btn class="btn-container" :content="'Reserve'" @click="toggleFormModal()">Reserve</reactive-btn>
    </div>
  </section>
</template>
<script>
import { utilService } from '../services/util.service';
import reactiveBtn from '../side-cmps/reactive-btn.vue'
import reserveForm from '../side-cmps/stay-reserve-form.vue';
export default {
  props: {
    stay: Object,
  },
  created() {
    this.session = utilService.loadFromSession('filter')
    if (!this.session) this.session = {
      dates: { to: '', from: '' }
    }
  },
  data() {
    return {
      dates: null,
      session: null
    }
  },
  components: {
    reactiveBtn,
    reserveForm
  },
  methods:{
    toggleFormModal(){
      document.querySelector('.wholeOrderMobile').classList.toggle('reserveFormMobile')
    }
  },
  computed: {
    price() {
      return '$' + (this.session.dates.to ?
        ((+this.session.dates.to.substring(3, 5)) - (+this.session.dates.from.substring(3, 5))) *
        this.stay.price : this.stay.price)
    },
    month() {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let currMonth = +this.session.dates.to.substring(0, 2)
      return months[currMonth - 1]
    },
    startDate() {
      return this.session.dates ? this.session.dates.from.substring(0, 2) : 'Select Dates'
    },
    endDate() {
      return this.session.dates ? this.session.dates.to.substring(0, 2) : ''
    }
  }
}
</script>