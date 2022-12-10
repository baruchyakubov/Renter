import { createRouter, createWebHashHistory } from 'vue-router'
import backOffice from './views/back-office.vue'
import home from './views/home.vue'
import wishlist from './views/wishlist.vue'
import chat from './views/chat.vue'
import stayApp from './views/stay-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import stayDetails from './views/stay-details.vue'
import orderApproval from './views/form-approval.vue'
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
    path: '/chat',
    name: 'chat',
    component: chat
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
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

