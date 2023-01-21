<template>
    <div  class="nav-details detailsContainer">
        <div class="flex-box space-between align-center">
            <nav>
                <div @click="scrollTo('.stay-details-name')">Photos</div>
                <div @click="scrollTo('.stay-details-amenities-section')">Amenities</div>
                <div @click="scrollTo('.stay-details-reviews')">Reviews</div>
                <div @click="scrollTo('.map-container')">Location</div>
            </nav>
            <div v-if="isReserveNavShown" class="reserve-nav">
                <div class="reserve-details">
                    <p class="cost-container"><span class="cost">${{ stay.price }}</span> night</p>
                    <div class="rating-reviews">
                        <p class="averageRate-container"><span class="averageRate"><img class="formStar" src="../assets/svg/review-start-svg.svg" />{{
                            rating
                        }}</span></p>
                         <span class="point">•</span>
                        <span class="reviews">{{ reviews }}</span>
                    </div>
                </div>
                <reactive-btn @click="scrollTo('.wholeOrder')" :content="'Reserve'">Reserve</reactive-btn>
            </div>
        </div>
    </div>
</template>

<script>
import reactiveBtn from '../side-cmps/reactive-btn.vue'

export default {
    props: {
        stay: Object,
        isReserveNavShown: Boolean
    },
    methods: {
        scrollTo(direction) {
            document.querySelector(direction).scrollIntoView({ behavior: 'smooth' });
        }
    },
    computed: {
        rating() {
            let ratingSum = 0
            this.stay.reviews.forEach(review => {
                ratingSum += review.rate
            })
            const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 3)
            if (average === 4 || average === 5 || average === 3) return average + '.0'
            else return average
        },
        reviews() {
            if (this.stay.reviews.length === 1) return '1 review'
            else return `${this.stay.reviews.length} reviews`
        }
    },
    components:{
        reactiveBtn
    }
}
</script>