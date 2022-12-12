<template>
  <div class="main-div">
    <section class="container home main-container">
      <user-modal v-if="isUserModal" @closeModal="closeModal"></user-modal>
      <user-msg />
      <app-header @openModal="openModal" />
      <router-view />
    </section>
    <div style="display:grid;">
      <app-footer ref="infiniteScrollTrigger" id="scrollTrigger"></app-footer>
    </div>

  </div>
</template>

<script>
import appFooter from './cmps/app-footer.vue'
import { eventBus } from './services/event-bus.service'
import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { authService } from './services/auth.service'
import { userService } from './services/user.service'
import userModal from './cmps/user-modal.vue'
import { socketService, SOCKET_EVENT_SEND_ORDER } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'

export default {
  data() {
    return {
      isUserModal: false,
      filterBy: {
        label: '',
        country: '',
        guestsCount: 0,
        page: 1
      }
    }
  },
  created() {
    sessionStorage.removeItem('filter');
    socketService.on(SOCKET_EVENT_SEND_ORDER, this.addOrder)
    eventBus.on('setFilterByPage', this.setFilterByPage)
    eventBus.on('setFilterByLabel', this.setFilterByLabel)
    eventBus.on('setFilterByTxt', this.setFilterByTxt)
    const user = authService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  mounted() {
    socketService.on('set-order-status', this.setOrderStatus)
  },
  methods: {
    setOrderStatus(order) {
      // if(!order) return showErrorMsg('Trouble processing order')
      showSuccessMsg(`your order has been ${order.status}`)
      this.$store.commit({ type: 'changeOrderStatusToUser', order: { ...order } })
    },
    addOrder(order) {
      setTimeout(() => {
        showSuccessMsg(`you've been received an order from ${order.buyer.fullname}`)
      this.$store.commit({ type: 'addOrder', order: { ...order } })
      }, 2000);
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
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    },
    setFilterByTxt(filter) {
      this.filterBy.country = filter.country
      this.filterBy.guestsCount = filter.guestsCount
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    },
    setFilterByPage() {
      this.filterBy.page++
      this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
    }
  },
  components: {
    appHeader,
    userMsg,
    userModal,
    appFooter
  },
}
</script>
