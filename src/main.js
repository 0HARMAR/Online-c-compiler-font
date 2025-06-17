import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './styles/element-variables.scss'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app') 