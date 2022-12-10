<template>
     <div class="guestsModalSearch flex-box">
      <div class="adultDiv">
        <div class="details">
          <h4>Adults</h4>
          <p>Age 13+</p>
        </div>
        <div class="counter">
          <button class="minusBtn" @click="decrement('adultCounter')"><span>-</span></button>
          <p>{{counter.adultCounter}}</p>
          <button @click="increment('adultCounter')">+</button>
        </div>
      </div>
      <div class="childrenDiv">
        <div class="details">
          <h4>Children</h4>
          <p>Ages 2-12</p>
        </div>
        <div class="counter">
          <button class="minusBtn"  @click="decrement('childrenCounter')"><span>-</span></button>
          <p>{{counter.childrenCounter}}</p>
          <button @click="increment('childrenCounter')">+</button>
        </div>
      </div>
      <div class="infantsDiv">
        <div class="details">
          <h4>Infants</h4>
          <p>Under 2</p>
        </div>
        <div class="counter">
          <button class="minusBtn" @click="decrement('infantCounter')"><span>-</span></button>
          <p>{{counter.infantCounter}}</p>
          <button @click="increment('infantCounter')">+</button>
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
      <!-- <h4 class="closeBtn" @click="$emit('toggleModal')">Close</h4> -->
    </div>
</template>
<script>
export default {
  props:{
    counter:Object
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
    console.log(this.counter)
  },
  computed:{
  }
}
</script>
<style >
  
</style>