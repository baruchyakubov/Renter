<template>
    <ul class="stay-list card-grid" v-if="stays">
        <li v-for="stay in stays" :key="stay._id">
            <stay-preview :stay="stay"></stay-preview>
        </li>
    </ul>
</template>

<script>
import { eventBus } from '../services/event-bus.service';
import stayPreview from './stay-preview.vue'
export default {
    name: "staylist",
    props: {
        stays: Array
    },
    data() {
        return {
            filterBy: {
                currentPage: 1,
                maxPerPage: 2,
                totalResults: 200,
                showLoader: false,
            },
            isPaging:null,
            observer: null
        }
    },
    created() {

    },
    mounted() {
        eventBus.emit('toggleLayout', false)
        this.isPaging = true
        this.scrollTrigger()
    },
    unmounted() {
        this.observer.unobserve(document.getElementById('scrollTrigger'))
        this.isPaging = false
    },
    methods: {
         scrollTrigger() {
            if(!this.isPaging) return
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0 && this.filterBy.currentPage < this.pageCount) {
                            eventBus.emit('setFilterByPage')
                    }
                })
            }, { rootMargin: "0px 0px 100px" })
            this.observer.observe(document.getElementById('scrollTrigger'))
        },
    },
    computed: {
        pageCount() {
            return Math.ceil(this.filterBy.totalResults / this.filterBy.maxPerPage)
        },
        pageOffset() {
            return this.filterBy.maxPerPage * this.filterBy.currentPage
        }
    },
    components: {
        stayPreview
    }
}
</script>
<style>
#scrollTrigger {
    height: 50px;
}
</style>