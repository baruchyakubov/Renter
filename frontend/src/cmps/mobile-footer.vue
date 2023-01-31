<template>
  <div>
    <div class="detailsContainer mobile-footer-container ">
      <div class="mobile-footer" v-if="stay">
        <div class="details">
          <h4 class="price">{{ price }} <span>night</span></h4>
          <span class="dates" v-if="session.dates.to">{{ dateFormat }}</span>
        </div>
        <reactive-btn class="btn-container" :content="'Reserve'" @click="toggleFormModal()">Reserve</reactive-btn>
      </div>
    </div>
  </div>

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
  methods: {
    toggleFormModal() {
      this.$store.commit({ type: 'setOpenReserveMobile', value:true})
    }
  },
  computed: {
    price() {
      return '$' + (this.session.dates.to ?
        ((+this.session.dates.to.substring(3, 5)) - (+this.session.dates.from.substring(3, 5))) *
        this.stay.price : this.stay.price)
    },
    dateFormat() {
      var arrStart = this.session.dates.from.split('/')
      var arrEnd = this.session.dates.to.split('/')
      const event = new Date(Date.UTC(arrStart[2], +arrStart[0] - 1, arrStart[1]))
      const options = { month: 'short', day: 'numeric' };
      if (arrStart[0] === arrEnd[0]) {
        return event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[1]
      } else {
        const event2 = new Date(Date.UTC(arrEnd[2], +arrEnd[0] - 1, arrEnd[1]))
        const options2 = { month: 'short', day: 'numeric' };
        return event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
      }
    }
  }
}
</script>