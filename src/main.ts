import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import fabric from 'fabric'

createApp(App).use(fabric).mount('#app')
