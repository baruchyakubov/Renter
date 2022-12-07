<template>
     <div class="guestsModal flex-box">
      <div class="adultDiv">
        <div class="details">
          <h4>Adults</h4>
          <p>Age 13+</p>
        </div>
        <div class="counter">
          <button class="minusBtn" @click="decrement('adultGuests')"><span>-</span></button>
          <p>{{guests.adults}}</p>
          <button @click="increment('adultGuests')">+</button>
        </div>
      </div>
      <div class="childrenDiv">
        <div class="details">
          <h4>Children</h4>
          <p>Ages 2-12</p>
        </div>
        <div class="counter">
          <button class="minusBtn"  @click="decrement('childrenGuests')"><span>-</span></button>
          <p>{{guests.childrens}}</p>
          <button @click="increment('childrenGuests')">+</button>
        </div>
      </div>
      <div class="infantsDiv">
        <div class="details">
          <h4>Infants</h4>
          <p>Under 2</p>
        </div>
        <div class="counter">
          <button class="minusBtn" @click="decrement('infantGuests')"><span>-</span></button>
          <p>{{guests.infants}}</p>
          <button @click="increment('infantGuests')">+</button>
        </div>
      </div>
      <div class="petsDiv">
        <div class="details">
          <h4>Pets</h4>
          <p>Bringing a service animal?</p>
        </div>
        <div class="counter">
        </div>
      </div>
      <p class="disclaimer">This place has a maximum of {{stay.capacity.guests}} guests, not including infants. Pets aren't allowed.</p>
      <h4 class="closeBtn" @click="$emit('toggleModal')">Close</h4>
    </div>
</template>
<script>
export default {
  props:{
    stay:Object,
    guests:Object
  },
  data(){
    return{
    }
  },
  methods:{
    increment(counter){
      return this.$emit('increment',counter)
    },
    decrement(counter){
      return this.$emit('decrement',counter)
    }
  },
  created(){
    console.log(this.guests)
  },
  computed:{
  }
}
</script>
<style >
  
</style>