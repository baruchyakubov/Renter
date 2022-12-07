<template>
    <section class="app-header main-layout">
        <div class="flex space-between align-center">
            <h1>toy store</h1>
            <nav class="nav flex">
                <router-link to="/">Home</router-link>
                <router-link to="/toy">Toys</router-link>
                <router-link to="/about">About</router-link>
                <section v-if="loggedInUser">
                    <p>Welcome {{ loggedInUser.fullname }}</p>
                    <button @click="logout">Logout</button>
                </section>
                <button v-else @click="isLoginClicked = !isLoginClicked" class="login">log-in</button>
                <login-signup @toggleModal="toggleModal" v-if="isLoginClicked"></login-signup>
            </nav>
        </div>
    </section>
</template>

<script>
import loginSignup from './login-signup.vue';
export default {
    data() {
        return {
            isLoginClicked: false,
        }
    },
    methods: {
        toggleModal() {
            this.isLoginClicked = false
        },
        logout() {
            this.$store.dispatch({ type: 'logout'})
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedInUser
        }
    },
    components: {
        loginSignup
    }
}
</script>