<template>
  <div>
    <div @click="(isClicked = !isClicked)" v-if="isClicked" class="opacity-wrapper"></div>
    <header
      :class="{ detailsContainer: this.isDetailsLayout, big: this.isClicked, mainContainer: !this.isDetailsLayout }"
      class="full">
      <div class="header-main flex-box">
        <div @click="home" class="logo flex-box align-center">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 1991.3 2143.2" viewBox="0 0 1991.3 2143.2" style="&#10;    height: 32px;&#10;    width: 32px;&#10; "><path d="m1851.6 1735.6c-15 111.6-90.1 208.1-195.2 251-51.5 21.4-107.3 27.9-163.1 21.4-53.6-6.4-107.3-23.6-163-55.7-77.2-43-154.5-109.4-244.6-208.1 141.6-173.8 227.4-332.5 259.6-474.1 15-66.5 17.2-126.6 10.7-182.4-8.6-53.6-27.9-103-57.9-145.9-66.5-96.5-178.1-152.3-302.5-152.3s-236 57.9-302.5 152.3c-30 42.9-49.3 92.3-57.9 145.9-8.6 55.8-6.4 118 10.7 182.4 32.2 141.6 120.1 302.5 259.6 476.2-88 98.7-167.3 165.2-244.6 208.1-55.8 32.2-109.4 49.4-163 55.8-55.3 6.2-111.2-1.2-163-21.4-105.1-42.9-180.2-139.5-195.2-251-6.4-53.6-2.1-107.2 19.3-167.3 6.4-21.5 17.2-42.9 27.9-68.6 15-34.3 32.2-70.8 49.3-107.3l2.2-4.3c148-319.7 306.8-645.8 472-963.3l6.4-12.9c17.2-32.1 34.3-66.5 51.5-98.7 17.2-34.3 36.5-66.5 60.1-94.4 45.1-51.5 105.1-79.4 171.6-79.4s126.6 27.9 171.6 79.4c23.6 27.9 42.9 60.1 60.1 94.4 17.2 32.2 34.3 66.5 51.5 98.6l6.5 12.9c163 319.6 321.8 645.7 469.8 965.4v2.1c17.2 34.3 32.2 73 49.3 107.3 10.7 25.8 21.5 47.2 27.9 68.6 17.1 55.9 23.5 109.5 14.9 165.3zm-856-100.9c-115.8-145.9-190.9-283.2-216.7-399-10.7-49.4-12.9-92.3-6.4-130.9 4.3-34.3 17.2-64.4 34.3-90.1 40.8-57.9 109.4-94.4 188.8-94.4s150.2 34.4 188.8 94.4c17.2 25.8 30 55.8 34.3 90.1 6.4 38.6 4.3 83.7-6.4 130.9-25.7 113.7-100.8 251-216.7 399zm967.6-111.5c-10.7-25.7-21.5-53.6-32.2-77.2-17.2-38.6-34.3-75.1-49.4-109.4l-2.1-2.1c-148-321.8-306.8-647.9-474.1-969.7l-6.4-12.9c-17.2-32.2-34.3-66.5-51.5-100.8-21.5-38.6-42.9-79.4-77.2-118-68.7-85.9-167.4-133.1-272.5-133.1-107.3 0-203.8 47.2-274.7 128.7-32.2 38.6-55.8 79.4-77.2 118-17.2 34.3-34.3 68.6-51.5 100.8l-6.4 12.8c-165.2 321.8-326.1 647.9-474.1 969.7l-2.1 4.3c-15 34.3-32.2 70.8-49.4 109.4-11.5 25.4-22.2 51.2-32.2 77.2-27.9 79.4-36.5 154.5-25.8 231.7 23.6 160.9 130.9 296.1 278.9 356.1 55.8 23.6 113.7 34.3 173.8 34.3 17.2 0 38.6-2.1 55.8-4.3 70.8-8.6 143.7-32.1 214.5-72.9 88-49.3 171.6-120.1 266-223.1 94.4 103 180.2 173.8 266 223.1 70.8 40.8 143.7 64.3 214.5 72.9 17.2 2.2 38.6 4.3 55.8 4.3 60.1 0 120.1-10.7 173.8-34.3 150.2-60.1 255.3-197.4 278.9-356.1 17.2-75 8.6-150-19.2-229.4z" fill="#FF385C"/></svg>
          <h1><span>R</span>enter</h1>
        </div>
        <section :class="{ filterInDetails: this.isDetailsLayout }" @click="toggleFilter" v-if="!isClicked"
          class="header-filter">
          <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'search' })" v-if="!this.isDetailsLayout">
            {{ countrySearch }}</div>
          <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'check-in' })" v-if="!this.isDetailsLayout">
            {{ dateFormat }}</div>
          <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'guests' })" v-if="!this.isDetailsLayout"
            class="grey">{{ guestsCount }}</div>
          <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'search' })" v-else
            class="start-your-search">
            Start your search</div>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
            focusable="false"
            style="border-radius: 50%; padding:9px; background-color: #FF385C; color: white;  display: block; fill: none; height: 30px; width: 30px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
            <g fill="none">
              <path
                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
              </path>
            </g>
          </svg>
        </section>
        <header-filter @toggleFilter="toggleFilter" @setFilterByTxt="setFilterByTxt" v-else></header-filter>
        <div class="right-header flex-box">
          <div class="renter-your-home">
            <p>Renter your home</p>
          </div>
          <div class="world-icon">
            <world-icon></world-icon>
          </div>
          <button @click="toggleMenuModal" class="menu-button flex-box align-center">
            <div class="menudiv">
              <div v-click-outside="toggleMenuModal" v-if="isMenuOpen" class="menu-modal">
                <div @click="$router.push('/')">Explore</div>
                <div v-if="!loggedInUser" @click="openModal('log')">Log in</div>
                <div v-if="!loggedInUser" @click="openModal('sign')">Signup</div>
                <div v-else class="user-menu-modal">
                  <div v-if="loggedInUser.isAdmin" @click="openBackOffice">Back-office</div>
                  <div @click="$router.push('/wishlist')">Wishlist</div>
                  <div @click="this.$router.push('/userOrders')">Your orders</div>
                  <div @click="logout">Logout</div>
                </div>
              </div>
            </div>
            <hamburger class="menu-icon" />
            <user-icon v-if="!loggedInUser" class="user-icon"></user-icon>
            <img v-else :src="loggedInUser.imgUrl" alt="https://robohash.org/57515702?set=set1"
              onerror="this.src='https://robohash.org/57515702?set=set1'">
          </button>
        </div>
      </div>
      <div @click="toggleFilterMobile" class="mobile-header">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
          focusable="false" style="display: block; height: 16px; width: 16px; fill: currentcolor;">
          <path
            d="M13 0c7.18 0 13 5.82 13 13 0 2.868-.929 5.519-2.502 7.669l7.916 7.917-2.828 2.828-7.917-7.916A12.942 12.942 0 0 1 13 26C5.82 26 0 20.18 0 13S5.82 0 13 0zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
            opacity=".8"></path>
        </svg>
        <div>
          <div v-if="!filterBy.country">Anywhere</div>
          <div v-else>{{ filterBy.country }}</div>
          <div class="flex-box col-2">
            <p v-if="!datesSearched">Any week</p>
            <p v-else>{{ dateFormat }}</p>
            <p>·</p>
            <p v-if="!filterBy.guestsCount">Add Guests</p>
            <p v-else>{{ filterBy.guestsCount }} Guests</p>
          </div>
        </div>
      </div>
      <mobile-filter @closeMobileFilter="toggleFilterMobile" :class="{ opened: isFilterMobileOpened }"></mobile-filter>
    </header>
  </div>

</template>
<script>
import mobileFilter from '../side-cmps/mobile-filter.vue';
import headerFilter from './header-filter.vue';
import hamburger from '../side-cmps/header-user-hamb.vue'
import worldIcon from '../side-cmps/header-world-icon.vue'
import userIcon from '../side-cmps/header-user-icon.vue'
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

export default {
  data() {
    return {
      isClicked: false,
      isDetailsLayout: false,
      isMenuOpen: false,
      filterFocus: '',
      isSearchActivated: false,
      filterDetails: '',
      datesSearched: null,
      scrollBefore: 0,
      isFilterMobileOpened: false
    }
  },
  created() {
    eventBus.on('toggleLayout', this.toggleLayout)
    eventBus.on('openModal', () => this.openModal('log'))
    eventBus.on('setFilterByTxt', () => {
      this.datesSearched = JSON.parse(sessionStorage.getItem('filter'))?.dates
    })
  },
  methods: {
    openModal(type) {
      this.$emit('openModal')
      if (type === 'log') this.$store.commit({ type: 'setIsLogged', condition: '' })
      if (type === 'sign') this.$store.commit({ type: 'setIsLogged', condition: 'true' })
    },
    toggleFilterMobile() {
      this.isFilterMobileOpened = !this.isFilterMobileOpened
      eventBus.emit('toggleMobileMenu')
    },
    home() {
      this.$router.push('/')
    },
    toggleLayout(bool) {
      this.isDetailsLayout = bool
    },
    toggleFilter() {
      this.isClicked = !this.isClicked
    },
    toggleMenuModal() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: 'logout' })
        this.$router.push('/')
        showSuccessMsg('Logged out succesfully')  
      } catch {
        showErrorMsg('Failed to logout')
      }
    },
    openBackOffice() {
      this.$router.push('/backOffice')
    },
    setFilterByTxt(filter) {
      this.isSearchActivated = true
      this.filterDetails = filter
      this.datesSearched = JSON.parse(sessionStorage.getItem('filter'))?.dates
      this.isClicked = false
      if (this.$router.currentRoute.path !== '/') this.$router.push('/')
      eventBus.emit('setFilterByTxt', filter)
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
    layout() {
      return { detailsContainer: this.isDetailsLayout }
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    height() {
      return { big: this.isClicked }
    },
    countrySearch() {
      if ((!this.isSearchActivated && !this.filterDetails.country) || this.filterDetails.country === '') return 'Anywhere'
      return this.filterDetails.country
    },
    dateFormat() {
      if ((!this.isSearchActivated && !this.datesSearched) || (this.datesSearched.from === '' &&
        this.datesSearched.to === '')) return 'Any week'
      var arrStart = this.datesSearched.from.split('/')
      var arrEnd = this.datesSearched.to.split('/')
      const event = new Date(Date.UTC(arrStart[2], arrStart[1], arrStart[0]))
      const options = { month: 'short', day: 'numeric' };
      if (arrStart[1] === arrEnd[1]) {
        this.datesSearched = event.toLocaleDateString("en-US", options) + ' - ' + arrEnd[0]
        return this.datesSearched
      } else {
        const event2 = new Date(Date.UTC(arrEnd[2], arrEnd[1], arrEnd[0]))
        const options2 = { month: 'short', day: 'numeric' };
        this.datesSearched = event.toLocaleDateString("en-US", options) + ' - ' + event2.toLocaleDateString("en-US", options2)
        return this.datesSearched
      }
    },
    guestsCount() {
      if ((!this.isSearchActivated && !this.filterDetails.guestsCount) || this.filterDetails.guestsCount === 0) return 'Add guests'
      return `${this.filterDetails.guestsCount} guests`
    }

  },
  components: {
    headerFilter,
    hamburger,
    userIcon,
    worldIcon,
    mobileFilter
  }


}
</script>

