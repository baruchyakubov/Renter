<template>
  <div class="opacity-wrapper"></div>
  <section v-if="toy" class="details-container">
    <h1>details</h1>

    <h2>{{ toy.name }}</h2>
    <h1>price: {{ toy.price }}$</h1>
    <small>created at: {{ dateFormat }}</small>
    <h1>{{ toy.inStock }}</h1>
    <chat :toy="toy"></chat>
    <h2>Reviews</h2>
    <form @submit.prevent="addReview" v-if="loggedInUser" action="">
      <label  for="">
        add a review:
        <input v-model="review" type="text" placeholder="Add text">
        <button>add</button>
      </label>
    </form>
    <ul>
      <li v-for="review in reviews" :key="review._id">
        <h1>{{review.user.fullname}}</h1>
        <p>{{review.txt}}</p>
      </li>
    </ul>
    <router-link to="/toy"><button>return</button></router-link>
  </section>
</template>

<script>
import authService from '../services/auth.service'
import chat from '../cmps/chat.vue'
export default {
  data() {
    return {
      toy: null,
      review: ''
    }
  },
  created() {
    const { id } = this.$route.params
    this.getToy(id)
  },
  methods: {
    async loadReviews(){
      await this.$store.dispatch({ type: 'loadReviews', filterBy:{toyId:this.toy._id} })
    },
    getToy(toyId) {
      console.log(toyId);
      this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
        console.log(toy);
        this.toy = toy
        this.loadReviews()
      })
    },
    addReview() {
      if (this.review === '') return
      const review = {
        userId: authService.getLoggedInUser()._id,
        toyId: this.toy._id,
        txt: this.review
      }
      console.log(review);
      this.$store.dispatch({ type: 'addReview', review})
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews
    },
    dateFormat() {
      return new Date(this.toy.createdAt).toLocaleString()
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  components:{
    chat
  }
}
</script>

