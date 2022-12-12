<template>
  <div v-if="form" class="wholeOrder">
    <div class="reserveFormAll">
      <section class="order-container">
        <div class="order-form-header">
          <p><span class="cost">${{ stay.price }}</span> night</p>
          <p><span class="averageRate"><img class="formStar" src="../assets/svg/review-start-svg.svg" />{{ rating
          }}</span>
            <span class="reviews">{{ reviews }}</span>
          </p>
        </div>
        <div class="order-data">
          <div class="date-picker">
            <div class="date-input">
              <label>CHECK-IN</label>
              <input :value=startDateComp />
            </div>
            <div class="date-input">
              <label>CHECKOUT</label>
              <input :value=endDateComp />
            </div>
          </div>
          <div class="guest-input" @click="toggleModal">
            <label>GUESTS</label>
            <input :value="totalGuests"/>
            <svg viewBox="0 0 320 512" width="100" title="angle-down">
              <path
                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
            </svg>
          </div>
        </div>
        <div class="btn-container" @click="onSubmit">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="content">
            <button class="action-btn">
              <span>Reserve</span>
            </button>
          </div>
        </div>
        <p class="chargeDisclaimer">You won't be charged yet</p>
        <div class="payout">
          <div class="payoutFlex flex-box">
            <p class="calcPrice">${{stay.price}} x {{totalNights}}</p>
            <p>${{stayCost}}</p>
          </div>
          <div class="payoutFlex flex-box">
            <p class="serviceFee">Service fee</p>
            <p>${{serviceFee}}</p>
          </div>
        </div>
        <div class="totalCalc flex-box">
          <p>Total</p>
          <p>${{totalCost}}</p>
        </div>
        <p class="footer">Report this listing</p>
      </section>
      <calendar @sendDates="receiveDates" class="OutsideCalendar"></calendar>
      <modal :stay="stay" :guests="guests" v-if="isModalShown" @toggleModal="toggleModal" @increment="increment"
        @decrement="decrement"></modal>
    </div>
  </div>
</template>
<script>
import { stayService } from '../services/stay.service'
import calendar from '../side-cmps/calendar.vue'
import modal from '../side-cmps/reserve-form-modal.vue'
import svgFlag from '../side-cmps/footer-logo.vue'
import { showErrorMsg, showUserMsg, showSuccessMsg } from '../services/event-bus.service'
export default {
  name: "reserve-form",
  props: {
    stay: Object
  },
  data() {
    return {
      value1: '',
      form: null,
      isModalShown: false,
      guests: {
        adults: 1,
        childrens: 0,
        infants: 0,
      },
      maxGuests: null,
      areDatesSelected:false
    }
  },
  created() {
    // this.$refs.guestsInput = this.guests
    this.maxGuests = this.stay.capacity
    this.form = stayService.getEmptyForm()
  },
  methods: {
    increment(guests) {
      if (this.total >= this.maxGuests) return
      // console.log('received guests',guests)
      // console.log('total ',this.total,'guests ',this.guests)
      if (guests === 'infantGuests') return this.guests.infants++
      if (guests === 'adultGuests') return this.guests.adults++
      if (guests === 'childrenGuests') return this.guests.childrens++
    },
    decrement(guests) {
      if (this.total <= 1) return
      // console.log('received guests',guests)
      // console.log('total ',this.total,'guests ',this.guests)
      if (guests === 'infantGuests' && this.guests.infants > 0) return this.guests.infants--; this.total--
      if (guests === 'adultGuests' && this.guests.adults > 0) return this.guests.adults--; this.total--
      if (guests === 'childrenGuests' && this.guests.childrens > 0) return this.guests.childrens--; this.total--
    },
    toggleModal() {
      this.isModalShown = !this.isModalShown
    },
    receiveDates(dates) {
      this.form.startDate = dates.from
      this.form.endDate = dates.to
    },
    async onSubmit() {
      try {
        // this.$store.dispatch({ type: 'sendForm', form: this.form })
        if (!this.currUser) {
          showErrorMsg('Login required')
          return
        }
        if(!this.form.startDate) return showErrorMsg('Dates required')
        this.form.guests = this.guests
        this.form.buyer = { _id: this.currUser._id, fullname: this.currUser.fullname , imgUrl:this.currUser.imgUrl}
        this.form.stay = {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price
        },
        this.form.serviceFee = this.serviceFee
          this.form.hostId = this.stay.host._id
        this.form.totalPrice = ((+this.form.endDate.substring(0, 2)) - (+this.form.startDate.substring(0, 2))) * this.stay.price
        this.$store.commit({ type: 'storeForm', form: this.form })
        this.$router.push('/stay/Approval')
      }
      catch {
        console.log('error while sending form')
      }

    },
  },
  computed: {
    serviceFee(){
      let cost = ((+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5)))* this.stay.price
      return cost ? Math.floor(cost /8): 5
    },
    stayCost(){
      let cost = ((+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5))) * this.stay.price
      return Intl.NumberFormat('en-US').format(cost)
    },
    totalCost(){
      let cost = ((+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5))) * this.stay.price+this.serviceFee
      return Intl.NumberFormat('en-US').format(cost)
    },
    totalNights(){
      if(!this.form.startDate ) return 1 +' night'
      else return ((+this.form.endDate.substring(3, 5)) - (+this.form.startDate.substring(3, 5)))+' nights'
    },
    startDateComp(){
      return !this.form.startDate ? 'Add dates' : this.form.startDate
    },
    endDateComp(){
      return !this.form.endDate ? 'Add dates' : this.form.endDate
    },
    total() {
      return this.guests.adults + this.guests.childrens + this.guests.infants
    },
    totalGuests(){
      return this.total <=1 ? this.total+' Guest' : this.total+' Guests'
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
    reviews() {
      if (this.stay.reviews.length === 1) return '1 review'
      else return `${this.stay.reviews.length} reviews`
    },
    currUser() {
      return this.$store.getters.loggedinUser
    }
  },
  components: {
    calendar,
    modal,
    svgFlag
  }
}
</script>
<style>

</style>