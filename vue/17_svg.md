# 一、[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md#vite-plugin-svg-icons)

一次生成所有svg文件的雪碧图。

安装

```bash
pnpm install vite-plugin-svg-icons -D
pnpm install fast-glob -D # vite-plugin-svg-icons 需要
```

配置

```javascript
// vite.config.ts
import path from "node:path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});
```

```typescript
// src/main.ts
import 'virtual:svg-icons-register'
```

在组件中使用，`symbolId` 要以 `#` 开头，位于 `iconDirs` 文件夹下的为`#icon-[name]`，位于其子文件夹下的为`#icon-[dir]-[name]`。

[aria-hidden](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)：从无障碍树上移除。

```vue
<template>
  <div>
    <!-- svg标签是图标的容器，fill、width等属性既可以设置在use上，也可以设置在svg上 -->
    <svg aria-hidden="true">
      <use xlink:href="#icon-more" fill="red" width="100" height="100" />
    </svg>
  </div>
</template>
```

注意：如果 svg 文件内设置了 `fill` 属性，组件中设置的 `fill` 属性会失效。（`width` 等属性不会失效）