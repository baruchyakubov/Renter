<template>
  <section class="container home main-container">
    <user-modal v-if="isUserModal" @closeModal="closeModal"></user-modal>
    <user-msg />
    <app-header @openModal="openModal" />
    <router-view />
  </section>
</template>

<script>

import { eventBus } from './services/event-bus.service'
import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { authService } from './services/auth.service'
import { userService } from './services/user.service'
import userModal from './cmps/user-modal.vue'


export default {
  data() {
    return {
      isUserModal: false,
      filterBy: {
        label: '',
        country: ''
      }
    }
  },
  created() {
    eventBus.on('setFilterByLabel', this.setFilterByLabel)
    eventBus.on('setFilterByTxt', this.setFilterByTxt)
    console.log('Vue App created')
    const user = authService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  methods: {
    closeModal() {
      this.isUserModal = false
    },
    openModal() {
      this.isUserModal = true
    },
    setFilterByLabel(label) {
      const filterBy = {...this.filterBy}
      filterBy.label = label
      this.$store.dispatch({ type: 'setFilterBy', filterBy })
    },
   
  },
  components: {
    appHeader,
    userMsg,
    userModal
  },
}
</script>