# seam-element

[![npm](https://img.shields.io/npm/v/seam-element.svg)](https://www.npmjs.com/package/seam-element)
[![license](https://img.shields.io/npm/l/seam-element.svg)](https://github.com/SeaMmMm/seam-element/blob/main/LICENSE)

`seam-element` 是一个基于 Vue 3 和 TypeScript 的高仿 Element Plus 的组件库，致力于为开发者提供高质量、可复用的 UI 组件。

## 特性

- **Vue 3 & TypeScript**：现代化技术栈，类型安全，开发体验优秀。
- **高仿 Element Plus**：熟悉的 API 和风格，易于上手。
- **模块化设计**：支持按需引入，减少打包体积。
- **丰富组件**：涵盖常用业务场景的 UI 组件。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install seam-element
# 或者
yarn add seam-element
```

## 快速开始

在项目中引入 `seam-element`：

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import SeElement from 'seam-element'
import 'seam-element/dist/index.css'

const app = createApp(App)
app.use(SeElement)
app.mount('#app')
```

## 按需引入

如果只需要使用部分组件，可以按需引入：

```typescript
import { Button } from 'seam-element'
import 'seam-element/dist/theme/Button.css'

export default {
  components: {
    Button,
  },
}
```

## 文档

更多使用说明和组件示例，请访问 [GitHub 仓库](https://github.com/SeaMmMm/se-element)。

## 贡献

欢迎大家为 `seam-element` 做出贡献！

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 提交 Pull Request

## License

[MIT](https://github.com/SeaMmMm/seam-element/blob/main/LICENSE) © 2025 SeaMmMm
