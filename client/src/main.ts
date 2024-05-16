import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import router from './router'
import Lara from '@/presets/lara'
import 'katex/dist/katex.min.css'
import VueKatex from '@hsorby/vue3-katex'

const app = createApp(App)
app.use(VueKatex, {
  globalOptions: {}
})

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara                            //apply preset        
});
app.use(router)

app.mount('#app')
