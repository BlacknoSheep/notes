# 一、css 作用域

## 1. 作用域样式 `scope` 

`scope` 可以保证定义的 css 样式只作用于当前组件

```html
<style scoped></style>
```

原理：

- 为 DOM 节点添加一个唯一不重复的 data 属性。形如：`data-v-123` 。
- 在 css 选择器的末尾增加当前组件的属性选择器来保证样式只作用于当前组件。形如：[data-v-123] 。
- 若组件内还包含其他组件，则只会给其他组件最外层标签加上当前组件的 data 属性。

```vue
<template>
  <el-input placeholder="输入" class="ipt"></el-input>
</template>

<style scoped lang="scss">
.ipt {
  width: 200px;
  .el-input__inner {
    background-color: #bfa;
  }
}
</style>
```

编译为：

```css
.ipt[data-v-7a7a37b1] {
  width: 200px;
}
/* 属性选择器在最后，无法选中子组件内部 */
.ipt .el-input__inner[data-v-7a7a37b1] {
  background-color: #bfa;
}
```

## 2. 深度选择器

可以通过 `:deep()` 伪类 选中子组件内部

```html
<style scoped lang="scss">
.ipt {
  width: 200px;
  :deep(.el-input__inner) {
    background-color: #bfa;
  }
}
</style>
```

编译为：

```css
.ipt[data-v-7a7a37b1] {
  width: 200px;
}
.ipt[data-v-7a7a37b1] .el-input__inner {
  background-color: #bfa;
}
```

## 3. 插槽选择器

默认情况下 `<slot/>` 渲染出来的内容的样式由父组件控制。使用 `:slotted` 伪类可以在当前组件中选中渲染后的插槽内容。

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

## 4. 全局选择器

可以通过 `:global` 伪类将样式应用到全局。

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

## 5. CSS Modules

一个 `<style module>` 标签会被编译为 [CSS Modules](https://github.com/css-modules/css-modules) 并且将生成的 CSS class 作为 `$style` 对象暴露给组件：

```vue
<template>
  <div :class="$style.red">123456</div>
  <div :class="[$style.red, $style.border]">123456</div>
</template>

<style module>
.red {
  color: red;
}
.border {
  border: 1px solid #aaa;
}
</style>
```

可以自定义对象名称

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

# 二、h5 适配（移动端适配）

可以通过 postcss 插件对 css 中的尺寸进行预处理，免去手动计算。

1. 安装

   ```bash
   pnpm install postcss -D
   ```

2. 编写插件

   ```typescript
   // postcss-px-to-viewport.ts
   import { Plugin } from "postcss";
   const Options = {
     viewportWidth: 375,
   };
   interface Options {
     viewportWidth: number;
   }
   export const PostCssPxToViewport = (options: Options = Options): Plugin => {
     return {
       postcssPlugin: "postcss-px-to-viewport",
       // 会遍历所有的 css 规则，每个规则都会调用一次 Declaration
       Declaration(decl) {
         if (decl.value.includes("px")) {
           const num = parseFloat(decl.value);
           decl.value = `${((num / options.viewportWidth) * 100).toFixed(2)}vw`;
         }
       },
     };
   };
   
   ```

3. 配置插件

   ```json
   // tsconfig.node.json 添加以下内容
   {
     "compilerOptions": {
       "noImplicitAny": false
     },
     "include": [plugins/**/*"]
   }
   ```

   ```typescript
   // vite.config.ts 中进行注册
   import { PostCssPxToViewport } from "./plugins/postcss-px-to-viewport";
   
   export default defineConfig({
     css: {
       postcss: { plugins: [PostCssPxToViewport()] },
     },
   });
   ```

# 三、css 原子化

提取小的 css 样式，提高复用性。

1. 安装 unocss

   ```bash
   pnpm install unocss -D
   ```

2. 配置

   直接在 vite 配置文件中进行配置

   ```typescript
   // vite.config.ts
   import unoCss from "unocss/vite";\export default defineConfig({
     plugins: [
       unoCss({
         variants: [
           /* ... */
         ],
         rules: [
           ["red", { color: "red" }],
           ["blue", { color: "blue" }],
         ],
         shortcuts: [
           /* ... */
         ],
         /* ... */
       }),
     ],
   });
   ```

   或者写一个单独的**`uno.config.ts`**文件

   ```typescript
   // vite.config.ts
   import unoCss from "unocss/vite";
   export default defineConfig({
     plugins: [unoCss()],
   });
   ```

   ```typescript
   // uno.config.ts
   import { defineConfig } from "unocss";
   export default defineConfig({
     variants: [
       /* ... */
     ],
     rules: [
       ["red", { color: "red" }],
       ["blue", { color: "blue" }],
     ],
     shortcuts: [
       /* ... */
     ],
     /* ... */
   });
   ```

   （1）在 **rules** 中定义规则：

   ```json
   // 静态规则
   ['m-1', { margin: '1px' }]
   
   // 动态规则，m-1, m-2.3, m-.5 等
   [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })]
   ```

   （2）在 **shortcuts** 中定义规则的组合

   ```json
   ["m10-red", "m-10 red"]
   ```

   （3）在 **variants（变体）**中可以在匹配规则前对类名进行预处理，从而实现将规则应用到某些特殊类（如伪类 xxx:hover )

   ```json
   variants: [
     // 匹配 hover: 开头的类名
     (matcher) => {
       if (!matcher.startsWith("hover:")) {
         // 传递给下一个变体或规则
         return matcher;
       }
       return {
         // 去掉 hover: 前缀，传递给下一个变体或规则
         matcher: matcher.slice(6),
         // 最终生成的选择器：`.${s}:hover`，其中 s 是最初传入的类名（传给第一个变体的类名）
         selector: (s) => `${s}:hover`,
       };
     },
   ],
   ```

    

   可以将部分配置放入另一个文件中，称为 Preset（预设）

   ```typescript
   // my-preset.ts
   import { Preset } from 'unocss'
   
   // 导出一个用于生成预设的函数
   export default function myPreset(options: MyPresetOptions): Preset {
     return {
       name: 'my-preset',
       rules: [
         // ...
       ],
       variants: [
         // ...
       ]
       // ...
     }
   }
   ```

   使用：

   ```typescript
   // unocss.config.ts
   import { defineConfig } from 'unocss'
   import myPreset from './my-preset'
   
   export default defineConfig({
     presets: [
       myPreset({
         /* 预设选项 */
       })
     ]
   })
   ```

   通过这种方式可以方便地导入[其他配置](https://alfred-skyblue.github.io/unocss-docs-cn/presets/icons)。

   ```typescript
   // unocss.config.ts
   import { defineConfig, presetIcons, presetAttributify, presetUno } from "unocss";
   
   export default defineConfig({
     presets: [presetIcons(), presetAttributify(), presetUno()],
   });
   ```

   

   

   在 `main.ts` 中引入后即可在全局进行使用。

      ```typescript
      // main.ts
      import "uno.css";
      ```

3. 使用

   ```vue
   <template>
     <div class="red">123</div>
   </template>
   ```

   编译时检测到 `red` 类时，会自动生成

   ```css
   .red {
     color: red;
   }
   ```

   未使用的类不会生成对应的css代码。

