<template>
  <ul class="stay-list card-grid" v-if="stays">
      <li  v-for="stay in stays" :key="stay._id">
        <stay-preview :stay="stay"></stay-preview>
      </li>
    </ul>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import stayPreview from './stay-preview.vue'
export default {
    name:"staylist",
    props:{
        stays:Array
    },
    mounted(){
        eventBus.emit('toggleLayout' , false)
    },
    components:{
        stayPreview
    }
}
</script>
