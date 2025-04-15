import SeamElement from 'seam-element'
import { createApp } from 'vue'
import App from './App.vue'
import 'seam-element/dist/index.css'

const app = createApp(App)
app.use(SeamElement)

app.mount('#app')
