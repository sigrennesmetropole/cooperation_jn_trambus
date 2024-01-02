import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@sigrennesmetropole/cooperation_jn_common_ui/dist/style.css'
import './assets/main.css'
import { apiConfigService } from './services/api-config'

declare global {
  interface Window {
    CESIUM_BASE_URL: string
  }
}
window.CESIUM_BASE_URL = '/node_modules/@vcmap-cesium/engine/Build/'

const app = createApp(App)

app.use(createPinia())

apiConfigService.getConfig().then(() => {
  app.use(router)
  app.mount('#app')
})
