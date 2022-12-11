<template>
  <section class="order-preview">
    <img :src="loggedinUser.imgUrl" alt="">
        <div class="order-details">
            <h1>{{ order.buyer.fullname }}</h1>
            <p class="date">Reserved at: {{ dateFormat }}</p>
            <p>{{ guestsCount }} guests | {{ dateFormat2 }}</p>
            <p>your apartment in {{ place }} in tel-aviv</p>
        </div>
        <span :class="{green: order.status === 'approved' , yellow:order.status === 'pending'}" class="status">{{ order.status }}</span>
  </section>
</template>

<script>
export default {
props:{
    order:Object
},
computed:{
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
            var arrStart = this.order.startDate.split('/')
            var arrEnd = this.order.endDate.split('/')
            const event = new Date(Date.UTC(arrStart[2], arrStart[0],arrStart[1] ))
            const options = { month: 'short', day: 'numeric' }
            if (arrStart[0] === arrEnd[0]) {
                var str = event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[1]
                return str
            } else {
                const event2 = new Date(Date.UTC(arrStart[2], arrStart[0],arrStart[1]))
                const options2 = { month: 'short', day: 'numeric' }
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
        status(){
            return order.status
        },
        loggedinUser(){
            return this.$store.getters.loggedinUser
        }
    }
}
</script>

