<template>
    <div class="opacity-wrapper"></div>
    <section class="edit-container">
        <h1>edit</h1>
        <form @submit.prevent="save()">
            <label class="m-b-m">
                name
                <input type="text" v-model="updatedToy.name" />
            </label>
            <label class="m-b-m">
                price
                <input type="text" v-model="updatedToy.price" />
            </label>
            <div class="btns flex align-center">
                <button class="edit-save-btn btn">Save</button>
            </div>
        </form>
        <router-link to="/toy"><button>return</button></router-link>
    </section>
</template>

<script>
export default {
    data() {
        return {
            updatedToy: {
                name: '',
                price: '',
                toyId: null,
            }
        }
    },
    created() {
        var toyId = this.$route.params.id;
        this.getToyById(toyId)
    },
    methods: {
        getToyById(toyId) {
         this.$store.dispatch({ type: 'getToyById', toyId })
                .then((toy) => this.updatedToy = toy)

        },
        save() {
        this.$store.dispatch({
            type: 'saveToy',
            toy:this.updatedToy
        })
            .then(() => {
                this.$router.push('/toy')
            })
    }
    }
}

</script>

