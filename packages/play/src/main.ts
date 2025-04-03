import ToyElement from 'toy-element'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(ToyElement)

app.mount('#app')
