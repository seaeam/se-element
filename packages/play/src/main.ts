import ToyElement from 'toy-element'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ToyElement)

app.mount('#app')
