import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue';
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import home from '../views/home.vue'
import deshboard from '../views/deshboard.vue'
import about from '../views/about.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: home,
    },
    {
      path: '/about',
      component: about,
    },
    {
      path: '/toy',
      component: toyApp,
      children: [
        {
          path: '/toy/details/:id',
          component: toyDetails
        },
        {
          path: '/toy/edit/:id?',
          component: toyEdit,
        },
        {
          path: '/toy/deshboard',
          component: deshboard,
        }
      ]
    },
  ]
})

export default router
