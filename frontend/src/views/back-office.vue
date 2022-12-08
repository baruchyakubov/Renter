<template>
  <section class="back-office main-">
    <h1>Orders status</h1>
    <div class="back-office-layout ">
      <ul class="orders main-container">
        <li class="flex-box " v-for="order in orders" :key="order._id">
          <order-preview :order="order"></order-preview>
        </li>
      </ul>
      <hosting-summery  :orders="orders"></hosting-summery>
    </div>
  </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import orderPreview from '../cmps/order-preview.vue';
import hostingSummery from '../cmps/hosting-summery.vue';
import { socketService } from '../services/socket.service';
export default {
  created() {
    const user = this.$store.getters.loggedinUser
    console.log(user);
    if (!user || !user.isAdmin) this.$router.push('/')
    this.$store.dispatch({ type: 'loadOrders' })
  },
  mounted(){

  },
  mounted() {
    eventBus.emit('toggleLayout', false)
  },
  computed: {
    orders() {
      return this.$store.getters.orders
    }
  },
  components:{
    orderPreview,
    hostingSummery
  }
}
</script>
