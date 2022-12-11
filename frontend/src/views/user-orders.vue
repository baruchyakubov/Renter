<template>
    <section class="user-orders detailsContainer">
        <h1>orders</h1>
        <ul>
            <li v-for="order in orders" :key="order._id">
                <user-order-preview :order="order"></user-order-preview>
            </li>
        </ul>
    </section>

</template>

<script>
import { eventBus } from '../services/event-bus.service'
import userOrderPreview from '../side-cmps/user-order-preview.vue'
export default {
    created() {
        const user = this.$store.getters.loggedinUser
        if (!user) this.$router.push('/')
        this.$store.dispatch({ type: 'loadOrders' })
    },
    mounted() {
        eventBus.emit('toggleLayout', true)
    },
    computed: {
        orders() {
            return this.$store.getters.orders
        }
    },
    components: {
        userOrderPreview
}
}
</script>

