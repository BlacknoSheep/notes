# 一、原生 Web Component

[Web Component](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)是一套自定义元素的技术。

```javascript
// index.js
class RedBtn extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const button = this.h("button");
    button.innerText = "Red Button";
    button.setAttribute(
      "style",
      "background-color: red; color: white; width: 100px; height: 50px; border-radius: 5px;"
    );
    shadow.appendChild(button);
  }

  h(el) {
    return document.createElement(el);
  }
}

window.customElements.define("red-btn", RedBtn);

// template形式
class MyBox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = this.h("template");
    template.innerHTML = `
    <div class="box">myBox</div>
    <style>
    // 样式会被隔离，不会影响到外部
    *{
      font-size: 50px;
    }
    .box{
      width: 100px;
      height: 100px;
      background: #bfa;
    }
    </style>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
  h(el) {
    return document.createElement(el);
  }
}

window.customElements.define("my-box", MyBox);

```

组件内的样式会被隔离，不会影响到组件外部。

引入包含自定义组件的脚本后，可以直接在html中使用，且可以复用。

```html
<!-- 使用 -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    ...
    <script src="index.js"></script>
  </head>
  <body>
    <red-btn></red-btn>
    <red-btn></red-btn>
    <my-box></my-box>
  </body>
</html>
```

[生命周期](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

# 二、在 vue 中使用

1. 在 `vite.config.ts` 中进行配置

```typescript
plugins: [
    vue({
      template: {
        compilerOptions: {
          // 只要是以mycmp-开头的标签，都当成自定义组件处理
          isCustomElement: (tag) => tag.startsWith("mycmp-"),
        },
      },
    }),
  ],
```

2. 文件要以 `.ce.vue` 结尾

```vue
<!-- App.vue -->
<template>
  <div>
    <mycmp-btn></mycmp-btn>
  </div>
</template>

<script setup lang="ts">
import { defineCustomElement } from "vue";
import CustomVueCe from "./components/CustomVue.ce.vue";
const myBtn = defineCustomElement(CustomVueCe);
window.customElements.define("mycmp-btn", myBtn);
</script>
```



