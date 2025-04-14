import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import SeamElement from 'seam-element'
import DefaultTheme from 'vitepress/theme'
import { type App } from 'vue'

import '@vitepress-demo-preview/component/dist/style.css'
import 'seam-element/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', ElementPlusContainer)
    app.use(SeamElement)
  },
}
