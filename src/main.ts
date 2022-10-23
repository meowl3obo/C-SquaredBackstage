import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './styles/app.scss'

const app = createApp(App).use(store).use(router)

app.mount('#app')