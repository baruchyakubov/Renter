<template>
  <div class="form-approval flex-box" v-if="stay">
    <div class="column1">
      <div class="header flex-box">
        <back-btn class="backBtn" @click="$router.push('/stay/' + form.stay._id)"></back-btn>
        <h1>Confirm and pay</h1>
      </div>
      <div class="trip-details">
        <h3 class="title">Your trip</h3>
        <h5 class="dates">Dates</h5>
        <p>{{ month }} {{ startDate }} - {{ endDate }}</p>
        <h5 class="guests">Guests</h5>
        <p>{{ guests }} guests</p>
      </div>
      <button @click="submit">Continue</button>
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
            <p>${{ totalPrice }}</p>
          </div>
          <div class="service">
            <p>Service fee</p>
            <h4>None</h4>
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
</template>
<script>
import { utilService } from '../services/util.service';
import backBtn from '../side-cmps/approval-backBtn.vue'
export default {
  name: 'approval-form',
  async created() {
    this.form = utilService.loadFromStorage('tempForm')
    this.stay = await this.getStay()
    console.log(this.stay);
  },
  data() {
    return {
      form: null,
      stay: null
    }
  },
  methods: {
    submit(){
      this.$store.dispatch({type:"sendForm",form:this.form})
      this.$store.commit({type:"removeTempForm"})
      this.$router.push('/stay/'+this.stay._id)
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
      return (+this.form.endDate.substring(0, 2)) - (+this.form.startDate.substring(0, 2))
    },
    totalPrice() {
      return ((+this.form.endDate.substring(0, 2)) - (+this.form.startDate.substring(0, 2))) * this.stay.price
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
    month() {
      if (+this.form.endDate.substring(3, 5) === 12) return 'Dec'
      if (+this.form.endDate.substring(3, 5) === 11) return 'Nov'
      if (+this.form.endDate.substring(3, 5) === 10) return 'Oct'
      if (+this.form.endDate.substring(3, 5) === 9) return 'Sep'
      if (+this.form.endDate.substring(3, 5) === 8) return 'Aug'
      if (+this.form.endDate.substring(3, 5) === 7) return 'Jul'
      if (+this.form.endDate.substring(3, 5) === 6) return 'Jun'
      if (+this.form.endDate.substring(3, 5) === 5) return 'May'
      if (+this.form.endDate.substring(3, 5) === 4) return 'Apr'
      if (+this.form.endDate.substring(3, 5) === 3) return 'Mar'
      if (+this.form.endDate.substring(3, 5) === 2) return 'Feb'
      if (+this.form.endDate.substring(3, 5) === 1) return 'Jan'
    },
    startDate() {
      return this.form.startDate.substring(0, 2)
    },
    endDate() {
      return this.form.endDate.substring(0, 2)
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