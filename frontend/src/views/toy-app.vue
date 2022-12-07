<template>
    <router-view></router-view>
    <section class="main-layout toy-app">
        <div class="upper-list">
            <toy-filter class="filter" @setFilter="setFilter"></toy-filter>
            <nav>
                <router-link to="toy/edit/">
                    <button>Add Toy</button>
                </router-link>
                <router-link to="toy/deshboard">
                    <button>deshboard page</button>
                </router-link>
            </nav>
        </div>
        <toy-list v-if="toys" :toys="toys" @removeToy="removeToy"></toy-list>
    </section>
</template>

<script>
import toyFilter from '../cmps/toy-filter.vue'
import toyList from '../cmps/toy-list.vue'
export default {
    data() {
        return {

            filterBy: {
                txt: '',
                label: '',
                inStock: false
            }
        }
    },
    computed: {
        toys() {
            return this.$store.getters.toys
        }
    },
    methods: {
        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            this.$store.dispatch({ type: 'setFilterBy', filterBy: { ...this.filterBy } })
        }
    },
    components: {
        toyList,
        toyFilter
    }
}
</script>
