<template>
    <div class="order-preview">
        <img src="https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599766/fyqzvdwwboawqnvhi0we.jpg" alt="">
        <div class="order-details">
            <h1>{{ order.buyer.fullname }}</h1>
            <p class="date">Reserved at: {{ dateFormat }}</p>
            <p>{{ guestsCount }} guests | {{ dateFormat2 }}</p>
            <p>Your apartment in {{ place }}</p>
        </div>
        <div v-if="order.status === 'pending'" class="btn-status flex-box">
            <button @click="setStatusToApproved" class="approve">Approve</button>
            <button @click="setStatusToRejected" class="reject">Reject</button>
        </div>

        <span :class="{ green: order.status === 'approved' }" v-else class="status">{{ status }}</span>
</div>


</template>

<script>
export default {
    props: {
        order: Object
    },
    computed: {
        dateFormat() {
            const date = new Date(this.order.createdAt)
            const dateFormat = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getUTCDay(), 0, 0))

            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }

            return dateFormat.toLocaleDateString("en-US", options)
        },
        dateFormat2() {
            console.log(this.order.startDate);
            console.log(this.order.endDate);
            var arrStart = this.order.startDate.split('/')
            var arrEnd = this.order.endDate.split('/')
            const event = new Date(Date.UTC(arrStart[2], arrStart[0],arrStart[1] ))
            const options = { month: 'short', day: 'numeric' };
            if (arrStart[0] === arrEnd[0]) {
                var str = event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[1]
                return str
            } else {
                const event2 = new Date(Date.UTC(arrStart[2], arrStart[0],arrStart[1]))
                const options2 = { month: 'short', day: 'numeric' };
                var str = event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
                return str
            }
        },
        guestsCount() {
            let counter = 0
            for (const property in this.order.guests) {
                counter += this.order.guests[property]
            }
            return counter
        },
        place() {
            return this.order.stay.name
        },
        status() {
            return this.order.status.charAt(0).toUpperCase() + this.order.status.slice(1).toLowerCase();
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    methods: {
        setStatusToApproved() {
            var updatedOrder = { ...this.order }
            console.log(updatedOrder);
            updatedOrder.status = 'approved'

            this.$store.dispatch({ type: 'updateOrder', updatedOrder: JSON.stringify(updatedOrder) })
        },
        setStatusToRejected() {
            var updatedOrder = { ...this.order }
            updatedOrder.status = 'rejected'
            this.$store.dispatch({ type: 'updateOrder', updatedOrder: JSON.stringify(updatedOrder) })
        }
    }
}
</script>

