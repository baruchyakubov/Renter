<template>
     <section class="toy-list ">
       <ul class="list-container">
        <li class="toy-preview flex align-center justify-center column" v-for="toy in toys" :key="toy._id">
            <toy-preview 
            :toy="toy"
            @removeToy="removeToy"
            ></toy-preview>
        </li>
       </ul>
    </section>
</template>

<script>
import toyPreview from './toy-preview.vue';
export default {
props:{
    toys:{
        type:Array
    }
},
created(){
   
},
methods:{
    removeToy(todoId){
        this.$emit('removeToy',todoId)
    }
},
components:{
    toyPreview
}
}
</script>

