<template>
    <GoogleMap api-key="AIzaSyCUULYFXTm54sJpFG0A_EfjKXAbHCVknBM" style="width: 100%; height: 500px" :center="center"
        :zoom="15">
        <Marker v-for="m in markers" :options="m" @click="center = m.position" :key="m"/>
    </GoogleMap>
</template>
  
<script>
import { getApiKey } from '../services/secret'
import { GoogleMap, Marker } from "vue3-google-map";

export default {
    data() {
        return {
          apiKey: getApiKey(),
            center: { lat: 32.0853, lng: 34.7818  },
            markers: [
        {
          title: 'Tel-Aviv',
          position: { lat: 32.0853, lng: 34.7818 },
        },
        {
          title: 'petah-tikve',
          position: { lat: 31.7683, lng: 35.2137 },
        },
        {
          title: 'hedera',
          position: { lat: 31.8928, lng: 34.8113 },
        },
      ],
        }
    },
    created(){
      console.log(this.apiKey);
    },
    components: {
        GoogleMap, Marker
    }
}


</script>