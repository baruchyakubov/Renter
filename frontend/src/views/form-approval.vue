<template>
  <div class="detailsContainer">
    <div class="form-approval" v-if="stay">
      <div class="column0">
        <div class="header flex-box">
          <back-btn class="backBtn" @click="$router.push('/stay/' + form.stay._id)"></back-btn>
          <h1>Confirm and pay</h1>
        </div>
      </div>
      <div class="column1">
        <div class="trip-details">
          <h3 class="title">Your trip</h3>
          <h5 class="dates">Dates</h5>
          <p>{{ dateFormat }}</p>
          <h5 class="guests">Guests</h5>
          <p>{{ guests }} guests</p>
        </div>
        <button @click="submit">Confirm</button>
      </div>
      <div class="column2">
        <div class="card flex-box">
          <img class="cardImg" :src=this.stay.imgUrls[0] alt="">
          <div class="cardRight">
            <div class="desc">
              <p class="roomtype">{{ this.stay.roomType }}</p>
              <p class="summary">{{ this.stay.summary }}</p>
            </div>
            <div class="bottomDiv">
              <img class="star" src="../assets/svg/review-start-svg.svg">
              <p>{{ rating }} <span class="reviews">({{ reviews }})</span></p>
            </div>
          </div>
        </div>
        <h4 class="bookingProtection">Your booking is protected by <span><span class="rent">rent</span>cover</span></h4>
        <div class="price-details">
          <h3 class="title">Price details</h3>
          <div class="price-specs">
            <div class="final-price">
              <p>${{ form.stay.price }} x {{ staySpan }} nights</p>
              <p>${{ totalPrice- form.serviceFee }}</p>
            </div>
            <div class="service">
              <p>Service fee</p>
              <h4>${{ form.serviceFee }}</h4>
            </div>
            <div class="service">
              <p>Occupants</p>
              <h4>{{ guests }}</h4>
            </div>
          </div>
          <div class="total-price">
            <h4>Total(USD)</h4>
            <p>${{ totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { eventBus } from '../services/event-bus.service';
import { utilService } from '../services/util.service';
import backBtn from '../side-cmps/approval-backBtn.vue';

export default {
  name: 'approval-form',
  async created() {
    eventBus.emit('toggleLayout', true)
    this.form = utilService.loadFromStorage('tempForm')
    this.stay = await this.getStay()
    this.form.stay.imgUrl = this.stay.imgUrls[0]
    this.form.stay.loc = this.stay.loc
  },
  data() {
    return {
      form: null,
      stay: null
    }
  },
  mounted() {
    this.scrollTop()
  },
  methods: {
    async submit() {
      await this.$store.dispatch({ type: "sendForm", form: this.form })
      this.$store.commit({ type: "removeTempForm" })
      this.$router.push('/userOrders')
    },
    scrollTop() {
      window.scrollTo(0, 0)
    },
    async getStay() {
      return this.$store.dispatch({ type: "setCurrStay", stayId: this.form.stay._id })
    }
  },
  computed: {
    occupants() {
      return this.form.guests.forEach(guest)
    },
    staySpan() {
      return (+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5))
    },
    totalPrice() {
      return ((+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5))) * this.stay.price
    },
    reviews() {
      if (this.stay.reviews.length === 1) return '1 review'
      else return `${this.stay.reviews.length} reviews`
    },
    rating() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 3)
      if (average === 4 || average === 5 || average === 3) return average + '.0'
      else return average
    },
    dateFormat() {
      var arrStart = this.form.startDate.split('/')
      var arrEnd = this.form.endDate.split('/')
      const event = new Date(Date.UTC(arrStart[2], +arrStart[0] - 1, arrStart[1]))
      const options = { month: 'short', day: 'numeric' };
      if (arrStart[0] === arrEnd[0]) {
        return event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[1]
      } else {
        const event2 = new Date(Date.UTC(arrEnd[2], +arrEnd[0] - 1, arrEnd[1]))
        const options2 = { month: 'short', day: 'numeric' };
       return event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
      }
    },
    guests() {
      return Object.values(this.form.guests).reduce((a, b) => a + b, 0)
    }
  },
  components: {
    backBtn
  }
}
</script>
<style>

</style>