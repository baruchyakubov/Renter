<template>
    <div style="max-width:80%; position: relative; left: 50%; transform: translate(-50%);">
        <DoughnutChart :options="options" :chartData="testData" />
    </div>
</template>
  
<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: 'Home',
    components: { DoughnutChart },
    props: {
        testData: Object
    },
    data() {
        return {
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        }
    }
}
</script>