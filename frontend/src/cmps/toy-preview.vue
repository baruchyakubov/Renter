<template>
    <img class="img-toy" src="src/img/toy.webp" alt="">
    <h1>{{ toy.name }}</h1>
    <h1>{{ priceFormat }}</h1>
    <section class="preview-buttons flex">  
    <button @click="removeToy">delete</button>
    <button @click="edit">edit</button>
    <button @click="details">details</button>
    </section>
        
</template>

<script>
export default {
name:'toy-preview',
props:['toy'],
emits:['removeToy'],
computed:{
    priceFormat(){
        return `${this.toy.price}$`
    }
},
methods:{
    removeToy(){
        this.$emit('removeToy',this.toy._id)
    },
    edit(){
        this.$router.push({path:`/toy/edit/${this.toy._id}`})
    },
    details(){
        this.$router.push({path:`/toy/details/${this.toy._id}`})
    }
}
}
</script>

