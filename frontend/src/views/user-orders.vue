<template>
    <section v-if="isLoaded" class="user-trips detailsContainer">
        <h1 class="trips">Your trips</h1>
        <ul>
            <li v-for="order in orders" :key="order._id">
                <user-order-preview :order="order"></user-order-preview>
            </li>
        </ul>
    </section>
    <div v-else class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service'
import userOrderPreview from '../side-cmps/user-order-preview.vue'
export default {
    data() {
        return {
            isLoaded: false
        }
    },
    async created() {
        const user = this.$store.getters.loggedinUser
        if (!user) this.$router.push('/')
        await this.$store.dispatch({ type: 'loadOrders', from: 'orders-view' })
        this.isLoaded = true
    },
    mounted() {
        eventBus.emit('toggleLayout', true)
        window.scrollTo(0, 0);
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

