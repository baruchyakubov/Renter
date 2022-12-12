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
            regions: [{ name: 'i\'m flexible', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595372/icjxup7v3tvpb01neuzn.jpg' }, { name: 'Turkey', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595309/debhjc9psc7zwlswm0ov.png' }, { name: 'Spain', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595335/wyqvjpzw1nv1j0umn6a7.png' }
                , { name: 'Australia', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595433/bwielhwlvnk3bjketcug.png' }, { name: 'Canada', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595394/sssetly08dwd8svl3irn.png' }
                , { name: 'United states', img: 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670595131/buux79td14irxoiianls.png' }]
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
