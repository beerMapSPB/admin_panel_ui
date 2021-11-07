import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import vClickOutside from 'click-outside-vue3'
import 'noidea-ui/dist/style.css'
import 'reflect-metadata/Reflect'

const app = createApp(App)

app.use(router)
app.use(vClickOutside)

app.mount('#app')
