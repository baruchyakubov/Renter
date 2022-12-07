<template>
    <section class="search">
        <div class="search-input" tabindex="1">
            <h1>Where</h1>
            <input v-model="country" type="search" placeholder="Search destinations">
        </div>
        <div class="check-in" tabindex="1">
            <h1>Check in</h1>
            <input v-model="dates.from" type="text" placeholder="Add dates">
        </div>
        <div class="check-out" tabindex="1">
            <h1>Check out</h1>
            <input v-model="dates.to" type="text" placeholder="Add dates">
        </div>
        <div class="add-guests flex-box align-center space-between" tabindex="1" @click="toggleGuestModal" >
            <section >
                <h1>Who</h1>
                <p>{{ addGuests }}</p>
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
    <guest-modal @toggleModal="toggleGuestModal" :counter="counter" v-if="isGuestsShown"></guest-modal>
</template>

<script>
import guestModal from '../side-cmps/search-guest-modal.vue'
import calendar from '../side-cmps/calendar.vue'
export default {
    data() {
        return {
            dates: { from: '', to: '' },
            counter: {
                adultCounter: 0,
                infantCounter: 0,
                childrenCounter: 0
            },
            isGuestsShown:false,
            country:''
        }
    },
    mounted() {
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("mouseover", () => {
            document.querySelector('.check-in').style.backgroundColor = '#DDDDDD'
            document.querySelector('.check-in>input').style.backgroundColor = '#DDDDDD'
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("mouseover", () => {
            document.querySelector('.check-out').style.backgroundColor = '#DDDDDD'
            document.querySelector('.check-out>input').style.backgroundColor = '#DDDDDD'
        })
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("mouseout", () => {
            document.querySelector('.check-in').style.backgroundColor = '#EBEBEB'
            document.querySelector('.check-in>input').style.backgroundColor = '#EBEBEB'
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("mouseout", () => {
            document.querySelector('.check-out').style.backgroundColor = '#EBEBEB'
            document.querySelector('.check-out>input').style.backgroundColor = '#EBEBEB'
        })
        document.querySelector('.el-date-editor :nth-child(2)').addEventListener("click", (event) => {
            document.querySelector('.check-in').classList.add('focus')
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in>input').style.backgroundColor = document.querySelector('.check-in').style.backgroundColor
            event.preventDefault()
        })
        document.querySelector('.el-date-editor :nth-child(4)').addEventListener("click", (event) => {
            document.querySelector('.check-out').classList.add('focus')
            document.querySelector('.check-in').classList.remove('focus')
            document.querySelector('.check-out>input').style.backgroundColor = document.querySelector('.check-out').style.backgroundColor
            event.preventDefault()
        })
        document.querySelector('.add-guests').addEventListener("click", () => {
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in').classList.remove('focus')
        })
        document.querySelector('.search-input').addEventListener("click", () => {
            document.querySelector('.check-out').classList.remove('focus')
            document.querySelector('.check-in').classList.remove('focus')
        })
    },
    methods: {
        search(e){
            e.stopPropagation()
            this.$emit('setFilterByTxt' , this.country)
        },
        toggleGuestModal(){
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
        }
    },
    computed: {
        addGuests() {
            if (!this.addGuests) return 'Add guests'
        }
    },
    components: {
        calendar,
        guestModal
    }
}
</script>

<style>

</style>