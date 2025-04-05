import { each } from 'lodash-es'
import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

/**
 * 创建一个安装器函数，用于批量注册组件到 Vue 应用实例中。
 *
 * @param components - 一个插件数组，每个插件都可以通过 `app.use` 方法注册到 Vue 应用中。
 * @returns 一个插件函数，可以通过 `app.use` 方法调用以注册所有提供的组件。
 */
export function makeInstaller(components: Plugin[]) {
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c)
    })

  return install as Plugin
}

/**
 * 将组件包装为带有安装方法的组件。
 *
 * @template T 组件的类型。
 * @param component 要包装的组件。
 * @returns 包装后的组件，带有 `install` 方法，可用于全局注册。
 *
 * 使用示例：
 * ```typescript
 * import { createApp } from 'vue';
 * import MyComponent from './MyComponent.vue';
 * import { withInstall } from './install';
 *
 * const App = createApp();
 * const InstallableComponent = withInstall(MyComponent);
 * App.use(InstallableComponent);
 * ```
 */
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name || 'UnnamedComponent'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}
