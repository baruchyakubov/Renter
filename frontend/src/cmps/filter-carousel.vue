<template>
    <carousel :mouseDrag="false" :transition="600" :itemsToScroll="9" style="padding:0;" :settings="settings"
        :breakpoints="breakpoints" class="mainContainer" :items-to-show="15" :wrap-around="true" :loop="false">
        <slide v-for="filter in filters" :key="filter">
            <div  style="width:100%" class="carousel__item"
                tabindex="1">
                <div :class="{ activeLabel: isActive === filter.name }" @click="$emit('setFilterByLabel', filter.name); isActive = filter.name" style="width:100%"
                    tabindex="1" class="stay-filter-div flex-box column">
                    <img :src="filter.icon" alt="">
                    <div class="stay-filter-btn">{{ filter.name }}</div>
                </div>
            </div>
        </slide>

        <template #addons>
            <div style="width:60px; height: 1px;">
                <navigation />
            </div>

        </template>
    </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: 'WrapAround',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    props: {
        filters: Array
    },
    data() {
        return {
            isActive: ''
        }
    },
    setup() {
        return {
            settings: {
                itemsToScroll: 3,
                itemsToShow: 3,
                snapAlign: "center"
            },
            breakpoints: {
                400: {
                    itemsToScroll: 4,
                    itemsToShow: 4,
                    snapAlign: "center"
                },
                500: {
                    itemsToScroll: 5,
                    itemsToShow: 5,
                    snapAlign: "center"
                },
                700: {
                    itemsToShow: 7,
                    snapAlign: "center"
                },
                900: {
                    itemsToShow: 9,
                    snapAlign: "center"
                },
                1034: {
                    itemsToScroll: 6,
                    itemsToShow: 11,
                    snapAlign: "center"
                },
                1154: {
                    itemsToShow: 12,
                    snapAlign: "center"
                },
                1254: {
                    itemsToScroll: 9,
                    itemsToShow: 14,
                    snapAlign: "center"
                },
                1400: {
                    itemsToScroll: 9,
                    itemsToShow: 15,
                    snapAlign: "center"
                },
                1600: {
                    itemsToScroll: 9,
                    itemsToShow: 18,
                    snapAlign: "center"
                }
            }
        };
    }
}
</script>

