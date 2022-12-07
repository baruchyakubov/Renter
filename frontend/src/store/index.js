import { toyModule } from "./toys.store.js"
import { userModule } from "./users.store.js"
import { reviewStore } from "./review.store.js"

import { createStore } from 'vuex'

const store = createStore({
    strict: true,
    modules: {
        toyModule,
        userModule,
        reviewStore
    }
})
  
  export default store