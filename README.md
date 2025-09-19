# seam-element

[![npm](https://img.shields.io/npm/v/seam-element.svg)](https://www.npmjs.com/package/seam-element)
[![license](https://img.shields.io/npm/l/seam-element.svg)](https://github.com/SeaMmMm/seam-element/blob/main/LICENSE)

Vue3 + TS 高仿 ElementPlus 打造自己的组件库

一款功能全面、易用性强、文档丰富的 UI 组件库，完美兼容 Element Plus，为开发者提供高效的界面构建解决方案。

## 特性

### 功能覆盖和兼容性

- **广泛兼容**：本组件库能够广泛覆盖 Element Plus 的所有功能，确保无缝迁移。
- **API 一致性**：与 Element Plus 的 API 保持高度兼容，提供相同的功能和使用体验。

### 易用性和简化开发流程

- **简洁 API**：提供简洁明了的 API 和组件结构，助力开发者快速上手。
- **高效构建**：优化组件设计，减少开发时间和工作量，提升开发效率。
- **多范式兼容**：部分组件支持多种开发范式，满足不同开发者的需求。

### 文档和示例丰富

- **详细文档**：在线文档包含对每个组件的详尽描述，帮助用户深入理解。
- **实用示例**：提供清晰的示例代码和演示，加速用户的学习和应用过程。
- **易于理解**：通过解释和演示，帮助用户掌握组件的用途、属性和事件。

## 安装

使用 npm 或 yarn 安装：

```shell
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

更多使用说明和组件示例，请访问 [详细文档](seaeam.github.io/se-element/)。

## 贡献

欢迎大家为 `seam-element` 做出贡献！

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 提交 Pull Request

## License

[MIT](https://github.com/SeaMmMm/seam-element/blob/main/LICENSE) © 2025 SeaMmMm
