import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components: Plugin[]) {
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c)
    })

  return install as Plugin
}

export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name || 'UnnamedComponent'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}
