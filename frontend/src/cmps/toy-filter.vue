
<template>
  <section class="filter-container">
    <input class="search" v-model="filterBy.txt" @input="setFilterByTxt" type="search" placeholder="Search">
    <!-- <multi-select></multi-select> -->
    <label for="">
        <input type="checkbox"> in stock
    </label>
  </section>
</template>

<script>
// import multiSelect from './multi-select.vue'
import { utilService } from '../services/util.service.js'
export default {
    data(){
        return {
            filterBy:{
                txt:'',
                label:'',
                inStock:false
            }
        }
    },
    created(){
        this.setFilterByTxt = utilService.debounce(this.setFilterByTxt)
    },
    methods:{
        setFilterByTxt(){
            this.$emit('setFilter' , this.filterBy)
        }
    },
    components:{
        // multiSelect
    }
}
</script>



