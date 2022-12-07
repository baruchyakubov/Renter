<template>
    <section class="login-modal">
        <h3>Login/Signup</h3>
        <form @submit.prevent="login" class="login-form">
            <h2>Login</h2>
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button class="form-btn" @click="login">Login</button>
        </form>
        <hr />
        <form @submit.prevent="signup" class="signup-form">
            <h2>Signup</h2>
            <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
            <input type="text" v-model="signupInfo.username" placeholder="Username" />
            <input type="password" v-model="signupInfo.password" placeholder="Password" />
            <button class="form-btn">Signup</button>
        </form>
        <button @click="$emit('toggleModal')">return</button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                username: 'puki',
                password: '123'
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch({ type: 'login', credentials: this.credentials })
            this.$emit('toggleModal')
        },
        signup() {
            this.$store.dispatch({ type: 'signup', signupInfo: this.signupInfo })
            this.$emit('toggleModal')
        },
    }
}
</script>

<style>

</style>