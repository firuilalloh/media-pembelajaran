import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)
app.use(FloatingVue)
app.use(router)
app.mount('#app')
