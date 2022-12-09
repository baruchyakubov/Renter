<template>
    <section class="country-modal">
        <div class="country-container">
            <h2>Search by region</h2>
            <ul>
                <li v-for="region in regions" :key="region.name">
                    <button @click="setFilterSearch(region)" class="region-btn">
                        <img :src="region.img" alt="">
                    </button>
                    <div class="region-name">{{ region.name }}</div>

                </li>
            </ul>
        </div>

    </section>

</template>

<script>
import { utilService } from '../services/util.service';
export default {
    data() {
        return {
            regions: [{ name: 'i\'m flexible', img: 'public/maps-img/im-flexible.jpg' }, { name: 'Turkey', img: 'public/maps-img/Turkey.png' }, { name: 'Spain', img: 'public/maps-img/Spain.png' }
                , { name: 'Australia', img: 'public/maps-img/Australia.png' }, { name: 'Canada', img: 'public/maps-img/Canada.png' }
                , { name: 'United state', img: 'public/maps-img/United-state.png' }]
        }
    },
    methods: {
        setFilterSearch(region) {
            var selectedRegion
            if (region.name === 'i\'m flexible') {
                const idx = utilService.getRandomIntInclusive(1, 5)
                selectedRegion = this.regions[idx]
            } else selectedRegion = region

            this.$emit('setFilterSearch', selectedRegion)
        }
    }
}
</script>
