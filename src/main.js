import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/index.css'
import pinia from './stores'

const app = createApp(App)

// app.use(createPinia())
app.use(pinia)
app.use(router)

app.mount('#app')
