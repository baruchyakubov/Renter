<template>
<div style="max-width:100%;">
      <DoughnutChart :chartData="testData" />
</div>
  



   
</template>
  
<script>

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: 'Home',
    components: { DoughnutChart },
    props:{
        testData:Object
    }
}
</script>