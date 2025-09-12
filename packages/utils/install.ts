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

/**
 * 将普通函数包装为支持 Vue 插件安装机制的函数，为其添加 `install` 方法，
 * 以便通过 `app.use()` 自动注册到 `app.config.globalProperties` 上。
 *
 * @typeParam T - 需要被安装封装的原始函数类型
 *
 * @param fn - 原始函数（通常是一个工具函数或业务方法）
 * @param name - 注册到 `app.config.globalProperties` 上的键名（建议使用约定前缀，如 `$`）
 *
 * @returns 带有 `install(app)` 方法的同一个函数实例，可直接调用或通过 `app.use()` 安装
 *
 * @example
 * ```ts
 * // 定义原始工具函数
 * function formatDate(d: Date, pattern = 'YYYY-MM-DD'): string {
 *   // ...实现
 *   return '2024-01-01'
 * }
 *
 * // 包装为可安装函数
 * const FormatDate = withInstallFunction(formatDate, '$formatDate')
 *
 * // 方式一：直接调用
 * FormatDate(new Date())
 *
 * // 方式二：在 Vue 应用中安装
 * app.use(FormatDate)
 * // 之后在任意组件内：
 * // this.$formatDate(new Date())
 * // 或 script setup 中：
 * // const { proxy } = getCurrentInstance()!
 * // proxy!.$formatDate(new Date())
 * ```
 *
 * @remarks
 * 1. 该方法不会检测同名属性是否已存在，请在传入 `name` 时避免冲突。
 * 2. 返回值与原函数是同一引用，仅额外挂载了 `install`。
 * 3. 适用于快速为工具函数提供全局注入能力，而无需创建完整组件或插件对象。
 *
 * @throws 不直接抛出错误；若覆盖已有全局属性，可能导致运行期逻辑异常。
 *
 * @since 0.1.0
 * @public
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn
  }
  return fn as SFCWithInstall<T>
}
