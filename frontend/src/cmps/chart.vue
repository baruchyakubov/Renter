<template>
    <DoughnutChart :chartData="testData" />
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    props: {
    testData: Object,
  },
    components:{
        DoughnutChart
    }
}

</script>