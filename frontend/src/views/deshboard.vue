<template>
    <div class="opacity-wrapper"></div>
    <section style="text-align:center;" class="deshboard-container">
      <h1>Prices per toy label</h1>
      <chart :testData="testData"></chart>
      <h1>toys in stock by percentages per label</h1>
      <chart :testData="testData2"></chart>
      <router-link to="/toy"><button>return</button></router-link>
  </section>
</template>

<script>
import chart from '../cmps/chart.vue'
export default {
  components: { chart },
    data(){
       return {
        testData: null,
        testData2:null
       } 
    },
    created(){
        this.sumLabelToyPrice()
    },
    computed:{
       toys(){
        return this.$store.getters.toys
       } 
    },
    methods:{
        sumLabelToyPrice(){
            var labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle","Battery Powered"]
            var data = []
            var data2 = []
            labels.forEach(label =>{
                var sum = 0
                var sum2 = 0
                var toysCountPerLabel = 0
                this.toys.forEach(toy =>{
                    if(toy.labels.includes(label)){
                        sum += +toy.price 
                        toysCountPerLabel++
                        if(toy.inStock) sum2 ++
                    } 
                })
                data.push(sum)
                var percentage = (sum2/toysCountPerLabel)*100
                data2.push(percentage)
            })
            this.testData = {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED' , 'A6C8ED' , 'A5C6ED'],
                    },
                ],
            } 
            data = data2
            this.testData2 = {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED' , 'A6C8ED' , 'A5C6ED'],
                    },
                ],
            }    
        }
    }
}
</script>

