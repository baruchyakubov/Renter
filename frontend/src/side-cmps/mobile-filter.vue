<template>
    <section class="mobile-filter">
        <div class="top-filter">
            <close-btn @click="$emit('closeMobileFilter')" class="closeBtn"></close-btn>
        </div>
        <section class="main-mobile-filter">
            <mobile-country-search :country="filterBy.country" @setFilterSearch="setFilterSearch"
                @setActiveFilter="setActiveFilter" :activeFilter="activeFilter"></mobile-country-search>
            <mobile-calender-filter :dates="dates" @setActiveFilter="setActiveFilter" @setDates="setDates"
                :activeFilter="activeFilter"></mobile-calender-filter>
            <mobile-guest-filter @increment="increment" @decrement="decrement" @setActiveFilter="setActiveFilter"
                :activeFilter="activeFilter" :totalGuestsCount="totalGuestsCount"
                :counter="counter"></mobile-guest-filter>
        </section>
        <footer class="filter-footer">
            <div>
                <span @click="clearFilter" class="clear-filter">Clear all</span>
                <div @click="search" class="btn-container">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="content">
                        <button class="action-btn">
                            <span>Search</span>
                        </button>
                    </div>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                        focusable="false"
                        style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                        <g fill="none">
                            <path
                                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
        </footer>
    </section>
</template>
<script>
import closeBtn from './amenities-x.vue';
import mobileCountrySearch from './mobile-country-search.vue'
import mobileCalenderFilter from './mobile-calender-filter.vue';
import mobileGuestFilter from './mobile-guest-filter.vue'
import reactiveBtn from './reactive-btn.vue';
import { eventBus } from '../services/event-bus.service';

export default {
    data() {
        return {
            filterBy: {
                country: '',
                guestsCount: 0,
            },
            counter: {
                adultCounter: 0,
                infantCounter: 0,
                childrenCounter: 0
            },
            dates: { from: '', to: '' }
        }
    },
    components: {
        closeBtn,
        mobileCountrySearch,
        mobileCalenderFilter,
        mobileGuestFilter,
        reactiveBtn
    },
    methods: {
        search(e) {
            e.stopPropagation()
            sessionStorage.setItem('filter', JSON.stringify({ dates: this.dates, guests: this.counter }))
            eventBus.emit('setFilterByTxt', { country: this.filterBy.country, guestsCount: this.filterBy.guestsCount })
            this.$emit('closeMobileFilter')
        },
        setActiveFilter(activeFilter) {
            this.$store.commit({ type: 'setActiveFilter', activeFilter })
        },
        setFilterSearch(input) {
            this.filterBy.country = input
            this.setActiveFilter('mobileCalenderFilter')
        },
        increment(guestType) {
            if (guestType === 'infantCounter' && this.counter[guestType] === 2) return
            this.counter[guestType]++
        },
        decrement(guestType) {
            if (!this.counter[guestType]) return
            this.counter[guestType]--
        },
        clearFilter() {
            this.filterBy = {
                country: '',
                guestsCount: 0,
            }
            this.counter = {
                adultCounter: 0,
                infantCounter: 0,
                childrenCounter: 0
            }
            this.dates = { from: '', to: '' }
        },
        setDates(dates) {
            this.dates = dates
        }
    },
    computed: {
        activeFilter() {
            return this.$store.getters.activeMobileFilter
        },
        totalGuestsCount() {
            let guestsSum = 0
            for (const guestType in this.counter) {
                guestsSum += this.counter[guestType]
            }
            this.filterBy.guestsCount = guestsSum
            return guestsSum
        }
    }
}
</script>

<style>

</style>