import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import './style.css'
import App from './App.vue'
const app = createApp(App)
app.use(createPinia()) // 使用 Pinia
app.mount('#app')
