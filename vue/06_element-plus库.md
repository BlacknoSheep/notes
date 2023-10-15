# 一、安装和配置

1. 安装 `element-plus`

   ```bash
   pnpm install element-plus
   ```

   在 `main.ts` 中引入

   ```typescript
   // main.ts
   import { createApp } from 'vue'
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'
   import App from './App.vue'
   
   const app = createApp(App)
   
   app.use(ElementPlus)
   app.mount('#app')
   ```

   若安装了 Volar 插件，则需要在 `tsconfig.json` 中引入声明文件以获得代码提示

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       // ...
       "types": ["element-plus/global.d.ts"] // ts 5.0 以上版本不能省略 .d.ts
     }
   }
   ```

   

2. 安装 `@element-plus/icons-vue`

   **注意：新版的 Elemet Plus 图标库需要单独安装。**

   ```bash
   pnpm install @element-plus/icons-vue
   ```

   使用图标组件时，可以全局注册：

   ```typescript
   // main.ts
   import * as ElementPlusIconsVue from '@element-plus/icons-vue'
   
   const app = createApp(App)
   for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
     app.component(key, component)
   }
   ```

   也可以在组件中按需引入：

   ```typescript
   // App.vue
   import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
   ```

   