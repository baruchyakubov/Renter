<template>
  <div @click="(isClicked = !isClicked)" v-if="isClicked" class="opacity-wrapper"></div>
  <header :class="{ detailsContainer: this.isDetailsLayout, big: this.isClicked }" class="main-container full">
    <div class="header-main flex-box">
      <div class="logo flex-box align-center">
        <img style="height:40px;" src="/public/logo.png" alt="">
        <h1 @click="home"><span>R</span>enter</h1>
      </div>
      <section :class="{ filterInDetails: this.isDetailsLayout }" @click="toggleFilter" v-if="!isClicked"
        class="header-filter">
        <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'search' })" v-if="!this.isDetailsLayout">
          {{ countrySearch }}</div>
        <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'check-in' })" v-if="!this.isDetailsLayout">
          {{ dateFormat }}</div>
        <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'guests' })" v-if="!this.isDetailsLayout"
          class="grey">{{ guestsCount }}</div>
        <div @click="this.$store.commit({ type: 'setFilterFocus', value: 'search' })" v-else class="start-your-search">
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
        <p>Renter your home</p>
        <!-- <world-icon class="world-icon"></world-icon> -->
        <button @click="toggleMenuModal" class="menu-button flex-box align-center">
          <div class="menudiv">
            <div v-if="isMenuOpen" class="menu-modal">
              <div v-if="!loggedInUser" @click="openModal('log')">Log in</div>
              <div v-if="!loggedInUser" @click="openModal('sign')">Signup</div>
              <div v-else class="user-menu-modal">
                <div v-if="loggedInUser.isAdmin" @click="openBackOffice">Back-office</div>
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
  </header>
</template>
<script>
import headerFilter from './header-filter.vue';
import hamburger from '../side-cmps/header-user-hamb.vue'
import worldIcon from '../side-cmps/header-world-icon.vue'
import userIcon from '../side-cmps/header-user-icon.vue'
import { eventBus } from '../services/event-bus.service';
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
      scrollBefore: 0
    }
  },
  created() {
    eventBus.on('toggleLayout', this.toggleLayout)
},
  methods: {
    openModal(type) {
      this.$emit('openModal')
      if (type === 'log') this.$store.commit({ type: 'setIsLogged', condition: '' })
      if (type === 'sign') this.$store.commit({ type: 'setIsLogged', condition: 'true' })
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
      await this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
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
      console.log(this.filterDetails.country);
      if ((!this.isSearchActivated && !this.filterDetails.country) || this.filterDetails.country === '') return 'Anywhere'
      return this.filterDetails.country
    },
    dateFormat() {
      console.log(this.datesSearched);
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
    worldIcon
  }


}
</script>

