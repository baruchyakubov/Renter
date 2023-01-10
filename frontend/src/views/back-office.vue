<template>
  <section v-if="isLoaded" class="back-office mainContainer">
    <h1>Orders status</h1>
    <div class="back-office-layout ">
      <ul class="orders mainContainer">
        <li class="flex-box " v-for="order in orders" :key="order._id">
          <order-preview :order="order"></order-preview>
        </li>
      </ul>
      <hosting-summery :orders="orders"></hosting-summery>
    </div>
  </section>
  <div v-else class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import orderPreview from '../cmps/order-preview.vue';
import hostingSummery from '../cmps/hosting-summery.vue';

export default {
  data() {
    return {
      isLoaded: false
    }
  },
  async created() {
      const user = this.$store.getters.loggedinUser
      console.log(user);
      if (!user || !user.isAdmin) this.$router.push('/')
      await this.$store.dispatch({ type: 'loadOrders' , from:'back-office-view' })
      this.isLoaded = true
    
  },
  mounted() {
    eventBus.emit('toggleLayout', false)
  },
  computed: {
    orders() {
      return this.$store.getters.orders
    }
  },
  components: {
    orderPreview,
    hostingSummery
  }
}
</script>
