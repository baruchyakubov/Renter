<template>
  <div class="main-div">
    <section class="container home mainContainerr">
      <user-modal v-if="isUserModal" @closeModal="closeModal"></user-modal>
      <user-msg />
      <app-header :class="{ removeHeader: !isHeaderShown }" v-if="isHeaderShown" @openModal="openModal" />
      <router-view />
    </section>
    <div style="display:grid;">
      <app-footer ref="infiniteScrollTrigger" id="scrollTrigger"></app-footer>
    </div>
    <mobile-menu v-if="isMenuShown"></mobile-menu>
  </div>
</template>

<script>
import appFooter from './cmps/app-footer.vue'
import { eventBus } from './services/event-bus.service'
import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { authService } from './services/auth.service'
import userModal from './cmps/user-modal.vue'
import { socketService, SOCKET_EVENT_SEND_ORDER } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'
import mobileMenu from './cmps/mobile-menu.vue'

export default {
  data() {
    return {
      isUserModal: false,
      filterBy: {
        label: '',
        country: '',
        guestsCount: 0,
        page: 1
      },
      currRoute: this.$route.path,
      isMenuShown: true,
      isHeaderShown: true
    }
  },
  created() {
    if (this.$route.path === '/stay/:id') this.isMenuShown = false
    sessionStorage.removeItem('filter');
    socketService.on(SOCKET_EVENT_SEND_ORDER, this.addOrder)
    eventBus.on('setFilterByPage', this.setFilterByPage)
    eventBus.on('setFilterByLabel', this.setFilterByLabel)
    eventBus.on('setFilterByTxt', this.setFilterByTxt)
    eventBus.on('toggleMobileMenu', () => this.isMenuShown = !this.isMenuShown)
    const user = authService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  mounted() {
    socketService.on('set-order-status', this.setOrderStatus)
  },
  methods: {
    setOrderStatus(order) {
      showSuccessMsg(`your order has been ${order.status}`)
      this.$store.commit({ type: 'changeOrderStatusToUser', order: { ...order } })
    },
    addOrder(order) {
      setTimeout(() => {
        showSuccessMsg(`New order received`)
        this.$store.commit({ type: 'addOrder', order: { ...order } })
      }, 4500);
    },
    closeModal() {
      this.isUserModal = false
    },
    openModal() {
      this.isUserModal = true
    },
    setFilterByLabel(label) {
      this.filterBy.page = 1
      this.filterBy.label = label
      eventBus.emit('setLoaderMargin', '90px')
      this.$store.commit({ type: 'setStays', stays: [] })
      this.$store.commit({ type: 'setLoading', value: true })
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    },
    setFilterByTxt(filter) {
      this.filterBy.country = filter.country
      this.filterBy.guestsCount = filter.guestsCount
      eventBus.emit('setLoaderMargin', '90px')
      this.$store.commit({ type: 'setStays', stays: [] })
      this.$store.commit({ type: 'setLoading', value: true })
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    },
    setFilterByPage() {
      this.filterBy.page++
      eventBus.emit('setLoaderMargin', '0px')
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    }
  },
  watch: {
    '$route': function () {
      if (this.$route.path.includes('stay') && window.innerWidth <= 950) {
        this.isMenuShown = false
        this.isHeaderShown = false
        document.querySelector('body').classList.add('remove-margin')
      }
      else {
        this.isMenuShown = true
        this.isHeaderShown = true
        document.querySelector('body').classList.remove('remove-margin')
      }
    }
  },
  components: {
    appHeader,
    userMsg,
    userModal,
    appFooter,
    mobileMenu
  },
}
</script>
