<template>
    <div class="statistic">
        <h1>Hosting Summary</h1>
        <div class="greetings">
            <h2>Fantastic job!</h2>
            <p>Guests love what you're doing, keep up the good work and review your orders stats</p>
        </div>
        <div class="orders-stats">
            <div class="flex-box space-between">
                <p>Monthly earnings:</p>
                <span>$7,098</span>
            </div>
            <div class="flex-box space-between">
                <p>Average Rating:</p>
                <span>4.9</span>
            </div>
            <div class="flex-box space-between">
                <p>Amount of reviews:</p>
                <span>249</span>
            </div>
        </div>
        <chart-stats v-if="orders" :testData="testData"></chart-stats>

    </div>
</template>

<script>
import chartStats from './chart-stats.vue';
export default {
    components: {
        chartStats
    },
    props: {
        orders: Array
    },
    computed: {
        testData() {
            var approvedCount = 0
            var pendingCount = 0
            var rejectedCount = 0
            this.orders.forEach(order =>{
                if(order.status === 'approved') approvedCount++
                else if(order.status === 'pending') pendingCount++
                else rejectedCount++
            })
            return {
                labels: ['Approved', 'Pending', 'Rejected'],
                datasets: [
                    {
                        data: [approvedCount, pendingCount, rejectedCount],
                        backgroundColor: ['rgb(91, 168, 91)', 'rgb(236, 168, 40)', 'rgb(182, 103, 103)'],
                    }
                ]
            }


        }
    }
}

</script>

