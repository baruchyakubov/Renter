<template>
  <div @click="(isClicked = !isClicked)" v-if="isClicked" class="opacity-wrapper"></div>
  <header :class="{ detailsContainer: this.isDetailsLayout, big: this.isClicked }" class="main-container full">
    <div class="header-main flex-box">
      <div class="logo flex-box align-center">
        <img style="height:40px;" src="/public/logo.png" alt="">
        <h1 @click="home"><span>R</span>enter</h1>
      </div>
      <section @click="toggleFilter" v-if="!isClicked" class="header-filter">
        <div>Anywhere</div>
        <div>Any week</div>
        <div class="grey">Add guests</div>
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
      <header-filter @setFilterByTxt="setFilterByTxt" v-else></header-filter>
      <div class="right-header flex-box">
        <p>Renter here for you</p>
        <world-icon class="world-icon"></world-icon>
        <button @click="toggleMenuModal" class="menu-button flex-box align-center">
          <div class="menudiv">
            <div v-if="isMenuOpen" class="menu-modal">
              <div v-if="!loggedInUser" @click="openModal('log')">Log in</div>
              <div v-if="!loggedInUser" @click="openModal('sign')">Signup</div>
              <div v-else class="user-menu-modal"> 
                <div v-if="loggedInUser.isAdmin" @click="openBackOffice">Back-office</div>
                <div  @click="logout">Logout</div>
              </div>

            </div>
          </div>
          <hamburger class="menu-icon" />
          <user-icon v-if="!loggedInUser" class="user-icon"></user-icon>
          <img v-else :src="loggedInUser.imgUrl" alt="https://robohash.org/57515702?set=set1" onerror="this.src='https://robohash.org/57515702?set=set1'">
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
      isMenuOpen: false
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
      this.isClicked = true
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
    setFilterByTxt(country){
      this.isClicked = false
      eventBus.emit('setFilterByTxt' , country)
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

