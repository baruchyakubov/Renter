<template>
  <div>
    <div class="opacity-wrapper bigger-index" @click="closeModal"></div>
    <div class="user-modal-container">
      <back-btn class="backBtn" @click="closeModal"></back-btn>
      <h4 class="title">Log in or sign up</h4>
      <h3 class="welcome">Welcome to Renter</h3>
      <div class="inputDiv flex-box">
        <div class="fullname" v-if="signedup">
          <label for="fullname">Fullname</label>
          <input id="fullname" v-model="form.fullname" />
        </div>
        <div class="username">
          <label for="username">Username</label>
          <input id="username" v-model="form.username" />
        </div>
        <div class="password">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" />
        </div>
      </div>
      <div class="toggle-login">
        <a @click="toggleState" v-if="!signedup">Don't have an Account?</a>
        <a @click="toggleState" v-else>Already have an Account?</a>
      </div>

      <p class="disclaimer">We'll call or text you to confirm your number. Standard message and data rates apply.
        Privacy Policy</p>
      <reactive-btn :content="content" v-if="!signedup" @click="login"></reactive-btn>
      <reactive-btn :content="content" @click="signup" v-if="signedup"></reactive-btn>

    </div>
  </div>

</template>
<script>
import reactiveBtn from '../side-cmps/reactive-btn.vue'
import backBtn from '../side-cmps/approval-backBtn.vue';
import { showErrorMsg } from '../services/event-bus.service';
export default {
  data() {
    return {
      form: {
        fullname: '',
        username: '',
        password: ''
      },
      content: ''
    }
  },
  created() {
    this.content = (!this.signedup) ? 'Login' : 'Sign up'
  },
  methods: {
    toggleState() {
      if (!this.signedup) this.$store.commit({ type: 'setIsLogged', condition: 'true' })
      else this.$store.commit({ type: 'setIsLogged', condition: '' })
      this.content = (!this.signedup) ? 'Login' : 'Sign up'
    },
    closeModal() {
      this.$emit('closeModal')
    },
    async login() {
      try {
        document.querySelector('.btn-content').innerHTML = `<span class="loader"></span>`
        await this.$store.dispatch({ type: "login", userCred: this.form })
        this.closeModal()
      }
      catch {
        showErrorMsg('Login failed')
        document.querySelector('.btn-content').innerHTML = ''
        this.content = 'login'
        this.form = { fullname: '', username: '', bpassword: '' }
      }


    },
    async signup() {
      try {
        document.querySelector('.btn-content').innerHTML = `<span class="loader"></span>`
        await this.$store.dispatch({ type: "signup", userCred: this.form })
        this.closeModal()
      }
      catch {
        showErrorMsg('Signup failed')
        document.querySelector('.btn-content').innerHTML = ''
        this.content = 'Sign up'
        this.form = { fullname: '', username: '', bpassword: '' }
      }

    },
  },
  computed: {
    signedup() {
      return this.$store.getters.isLogged
    }
  }
  , components: {
    reactiveBtn,
    backBtn
  }
}
</script>
<style lang="">
  
</style>