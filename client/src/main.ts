import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import router from './router'
//@ts-ignore
import Lara from '@/presets/lara'
import 'katex/dist/katex.min.css'
import Tres from '@tresjs/core'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
});

app.use(Tres)
app.use(router)

app.mount('#app')
