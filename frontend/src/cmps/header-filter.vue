<template>
    <section class="search">
        <div class="search-input" tabindex="1">
            <h1>Where</h1>
            <input @input="getCountryList" ref="myinput" v-model="country" type="search" placeholder="Search destinations">
        </div>
        <span class="sep seperator1"></span>
        <div class="check-in" tabindex="1">
            <h1>Check in</h1>
            <input v-model="dates.from" type="text" placeholder="Add dates">
        </div>
        <span class="sep seperator2"></span>
        <div class="check-out" tabindex="1">
            <h1>Check out</h1>
            <input v-model="dates.to" type="text" placeholder="Add dates">
        </div>
        <span class="sep seperator3"></span>
        <div class="add-guests flex-box align-center space-between" tabindex="1" @click="toggleGuestModal">
            <section>
                <h1>Who</h1>
                <p>{{ addGuests }} Guests</p>
            </section>
            <!-- <div class="icon">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style=" border-radius: 50%; padding:17px; background-color: #FF385C; color: white;  display: block; fill: none; height: 50px; width: 50px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                    <g fill="none">
                        <path
                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                        </path>
                    </g>
                </svg>
            </div> -->
            <div class="alternateSearch" @click="search($event)">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                    <g fill="none">
                        <path
                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                        </path>
                    </g>
                </svg>
                <p>Search</p>
            </div>
        </div>
        <calendar @sendDates="sendDates" class="date-picker"></calendar>
    </section>
    <guest-modal v-click-outside="toggleGuestModal" @increment="increment" @decrement="decrement"
        @toggleModal="toggleGuestModal" :counter="counter" v-if="isGuestsShown"></guest-modal>
        <country-modal @setFilterSearch="setFilterSearch"  v-click-outside="toggleCountryModal" v-if="isCountryModalShown && !isListModalShown "></country-modal>
        <search-list-modal  v-if="isListModalShown"></search-list-modal>
</template>

<script>
import { utilService } from '../services/util.service'
import countryModal from '../side-cmps/country-modal.vue'
import guestModal from '../side-cmps/search-guest-modal.vue'
import calendar from '../side-cmps/calendar.vue'
import searchListModal from '../side-cmps/search-list-modal.vue'
export default {
    data() {
        return {
            dates: { from: '', to: '' },
            counter: {
                adultCounter: 0,
                infantCounter: 0,
                childrenCounter: 0
            },
            totalGuestsCount: 0,
            isGuestsShown: false,
            isCountryModalShown: false,
            isListModalShown: false,
            country: ''
        }
    },
    mounted() {
        this.getCountryList = utilService.debounce(this.getCountryList)
        window.addEventListener('scroll', () => {
            this.$emit('toggleFilter')
        })
        const focus = this.$store.getters.filterFocus
        this.setFocus(focus)
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("mouseover", () => {
            document.querySelector('.check-in').style.backgroundColor = '#DDDDDD'
            document.querySelector('.check-in>input').style.backgroundColor = '#DDDDDD'
            document.querySelector('.seperator1').style.backgroundColor = 'transparent'
            document.querySelector('.seperator2').style.backgroundColor = 'transparent'
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("mouseover", () => {
            document.querySelector('.check-out').style.backgroundColor = '#DDDDDD'
            document.querySelector('.check-out>input').style.backgroundColor = '#DDDDDD'
            document.querySelector('.seperator2').style.backgroundColor = 'transparent'
            document.querySelector('.seperator3').style.backgroundColor = 'transparent'
        })
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("mouseout", () => {
            document.querySelector('.check-in').style.backgroundColor = '#EBEBEB'
            document.querySelector('.check-in>input').style.backgroundColor = '#EBEBEB'
            document.querySelector('.seperator1').style.backgroundColor = '#DDDDDD'
            document.querySelector('.seperator2').style.backgroundColor = '#DDDDDD'
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("mouseout", () => {
            document.querySelector('.check-out').style.backgroundColor = '#EBEBEB'
            document.querySelector('.check-out>input').style.backgroundColor = '#EBEBEB'
            document.querySelector('.seperator2').style.backgroundColor = '#DDDDDD'
            document.querySelector('.seperator3').style.backgroundColor = '#DDDDDD'
        })

        document.querySelector('.add-guests').addEventListener("mouseover", () => {
            document.querySelector('.seperator3').style.backgroundColor = 'transparent'
        })
        document.querySelector('.add-guests').addEventListener("mouseout", () => {
            document.querySelector('.seperator3').style.backgroundColor = '#DDDDDD'
        })


        document.querySelector('.search-input').addEventListener("mouseover", () => {
            document.querySelector('.seperator1').style.backgroundColor = 'transparent'
        })
        document.querySelector('.search-input').addEventListener("mouseout", () => {
            document.querySelector('.seperator1').style.backgroundColor = '#DDDDDD'
        })
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("click", (event) => {
            if(this.isListModalShown){
                this.isListModalShown = false
                this.isCountryModalShown = false
            } 
            if (this.isGuestsShown) this.toggleGuestModal()
            document.querySelector('.check-in').classList.add('focus')
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.search-input').classList.remove('focus')
            document.querySelector('.add-guests').classList.remove('focus')
            document.querySelector('.check-in>input').style.backgroundColor = document.querySelector('.check-in').style.backgroundColor
            event.preventDefault()
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("click", (event) => {
            if(this.isListModalShown )this.isListModalShown = false
            if (this.isGuestsShown) this.toggleGuestModal()
            document.querySelector('.check-out').classList.add('focus')
            document.querySelector('.check-in').classList.remove('focus')
            document.querySelector('.search-input').classList.remove('focus')
            document.querySelector('.add-guests').classList.remove('focus')
            document.querySelector('.check-out>input').style.backgroundColor = document.querySelector('.check-out').style.backgroundColor
            event.preventDefault()
        })
        document.querySelector('.add-guests').addEventListener("click", () => {
            if(this.isListModalShown){
                this.isListModalShown = false
                this.isCountryModalShown = false
            } 
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in').classList.remove('focus')
            document.querySelector('.search-input').classList.remove('focus')
        })
        document.querySelector('.search-input').addEventListener("click", () => {
            if (this.isGuestsShown) this.toggleGuestModal()
            if(!this.isCountryModalShown)this.toggleCountryModal()
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in').classList.remove('focus')
            document.querySelector('.add-guests').classList.remove('focus')
        })
        document.querySelector('.search-input input').addEventListener("click", () => {
            document.querySelector('.search-input').classList.add('focus')
            if(!this.isCountryModalShown )this.toggleCountryModal()
        })
    },
    unmounted(){
        window.removeEventListener("scroll" ,() => {
            this.$emit('toggleFilter')
        }); 
    },
    methods: {
        search(e) {
            e.stopPropagation()
            sessionStorage.setItem('filter', JSON.stringify({ dates: this.dates, guests: this.counter }))
            this.$emit('setFilterByTxt', { country: this.country, guestsCount: this.totalGuestsCount })
        },
        getCountryList(){
            this.isListModalShown = (this.country === '') ? false : true
            this.$store.dispatch({ type: 'getCountryList', txt: this.country })
        },
        setFilterSearch(region){
            this.country = region.name 
            this.setFocus('check-in')
        },
        toggleGuestModal() {
            this.isGuestsShown = !this.isGuestsShown
        },
        removeFocus() {
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in').classList.remove('focus')
        },
        sendDates(dates) {
            this.removeFocus()
            this.dates.from = dates.from
            this.dates.to = dates.to
        },
        increment(guestTyoe) {
            if (guestTyoe === 'infantCounter' && this.counter[guestTyoe] === 2) return
            this.counter[guestTyoe]++
        },
        decrement(guestTyoe) {
            if (!this.counter[guestTyoe]) return
            this.counter[guestTyoe]--
        },
        toggleCountryModal(){
            this.isCountryModalShown = !this.isCountryModalShown
        },
        setFocus(focus) {
            if (focus === 'search') {
                document.querySelector('.search-input').classList.add('focus')
                document.querySelector('.search-input input').focus()
                setTimeout(() => {
                    this.toggleCountryModal()
                }, 250)
              
            }
            if (focus === 'check-in') {
                document.querySelector('.check-in').classList.add('focus')
                document.querySelector('.search-input').classList.remove('focus')
                if(this.isCountryModalShown )this.toggleCountryModal()
                setTimeout(() => {
                    document.querySelector('.el-date-editor :nth-child(2)').click()
                }, 250)

            }
            if (focus === 'guests') {
                document.querySelector('.add-guests').classList.add('focus')
                if(this.isCountryModalShown )this.toggleCountryModal()
                setTimeout(() => {
                    this.toggleGuestModal()
                }, 250)

            }
        }
    },
    computed: {
        addGuests() {
            let guestsSum = 0
            for (const guestTyoe in this.counter) {
                guestsSum += this.counter[guestTyoe]
            }
            if (!this.addGuests) return 'Add'
            this.totalGuestsCount = guestsSum
            return guestsSum
        }
    },
    components: {
        calendar,
        guestModal,
        countryModal,
        searchListModal
    }
}
</script>

<style>

</style>