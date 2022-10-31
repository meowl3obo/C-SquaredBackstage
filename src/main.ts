import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './styles/app.scss'
import CKEditor from '@ckeditor/ckeditor5-vue';

const app = createApp(App).use(store).use(router).use(CKEditor)

app.mount('#app')