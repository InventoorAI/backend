import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import router from './router'
//@ts-ignore
import VueKatex from '@hsorby/vue3-katex'
//@ts-ignore
import Lara from '@/presets/lara'
import 'katex/dist/katex.min.css'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
});

app.use(router)

app.mount('#app')
