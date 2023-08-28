import { createApp } from 'vue'
import App from './App.vue'

import './css/styles.css'
import './css/animations.css'
import store from './store'

createApp(App).use(store).mount('#app')
