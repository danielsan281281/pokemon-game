import { createApp } from 'vue'
import App from './App.vue'

import './css/styles.css'
import './css/animations.css'
import store from './store'
import router from './router'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
