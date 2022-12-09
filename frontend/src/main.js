import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router.js'
import { store } from './store/store.js'
import {
    focusDirective,
    rainbowDirective,
    customOnDirective,
    clickOutsideDirective,
  } from './directives'

import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import rootCmp from './root-cmp.vue'


const app = createApp(rootCmp)

app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')