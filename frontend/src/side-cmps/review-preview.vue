<template>
    <div>
        <div v-if="review" class="flex-box">
            <img class="reviewerImg" :src="review.by.imgUrl" />
            <div>
                <h4>{{ review.by.fullname }}</h4>
                <h5 class="reviewTime"> {{ year(review) }} {{ month(review) }}</h5>
            </div>
        </div>
        <p ref="previewParagraph" :class="{ preview: isPreviewReview }" class="reviewInsight">{{ review.txt }}</p>
        <div @click="isPreviewReview = !isPreviewReview" class="toggleReview">
            <span v-if="isPreviewReview && isOverflowing">Show more</span>
            <span v-else-if="isOverflowing">Show less</span>
            <svg v-if="isOverflowing" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                focusable="false"
                style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                <g fill="none">
                    <path
                        d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932">
                    </path>
                </g>
            </svg>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        review: Object
    },
    mounted() {
        const el = this.$refs['previewParagraph']

        this.isOverflowing = el.clientWidth < el.scrollWidth
            || el.clientHeight < el.scrollHeight
    },
    data() {
        return {
            isPreviewReview: true,
            isOverflowing: false
        }
    },
    methods: {
        month(review) {
            let month = +review.at.substring(5, 7)
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let currMonth = months[month]
            return currMonth
        },
        year(review) {
            return review.at.substring(0, 4)
        }
    }
}
</script>
