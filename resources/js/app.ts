import { createApp } from 'vue'
import router from './router'
import store from './store'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
