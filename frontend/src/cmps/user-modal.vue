<template>
  <div class="opacity-wrapper bigger-index" @click="closeModal"></div>
  <div class="user-modal-container">
    <h4 class="title">Log in or sign up</h4>
    <h3 class="welcome">Welcome to Renter</h3>
    <div class="inputDiv flex-box">
      <div class="fullname" v-if="signedup">
        <label for="fullname">Fullname</label>
        <input id="fullname" v-model="form.fullname"/>
      </div>
      <div class="username">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input id="password" v-model="form.password"/>
      </div>
    </div>
    <p class="disclaimer">We'll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy</p>
    <button v-if="signedup" @click="signup">Sign up</button>
    <button v-if="!signedup" @click="login">Login</button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      form:{
        fullname:'',
        username:'',
        password:''
      }
    }
  },
  created(){
    console.log(this.$store.getters.isLogged);
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    async login(){
      try{
        await this.$store.dispatch({type:"login",userCred:this.form})
        this.closeModal()
      }
      catch(err){
        console.log(err);
      }


    },
    signup(){
      this.$store.dispatch({type:"signup",userCred:this.form})
    },
  },
  computed:{
    signedup(){
      return this.$store.getters.isLogged
    }
  }
}
</script>
<style lang="">
  
</style>