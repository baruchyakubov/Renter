import { createRouter, createWebHashHistory } from 'vue-router'
import backOffice from './views/back-office.vue'
import wishlist from './views/wishlist.vue'
import stayApp from './views/stay-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import stayDetails from './views/stay-details.vue'
import orderApproval from './views/form-approval.vue'
import userOrders from './views/user-orders.vue'
const routes = [
  {
    path: '/',
    name: 'stay-app',
    component: stayApp
  },
  {
    path: '/stay/:id',
    component: stayDetails,
  },
  {
    path: '/stay/Approval',
    name: 'order-approval',
    component: orderApproval
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/backOffice',
    name: 'back-office',
    component: backOffice
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: wishlist
  },
  {
    path: '/userOrders',
    name: 'userOrders',
    component: userOrders
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

