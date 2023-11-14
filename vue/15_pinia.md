# 一、状态管理

[pinia](https://pinia.vuejs.org/zh/) 是 Vue 的存储库，用于跨组件/页面共享状态。

pinia 是 [Vuex](https://vuex.vuejs.org/zh/) 的上位替代。

在只需要[简单的状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html)时，可以通过在文件导出共享状态实现。

```typescript
// store.ts
import { ref } from "vue";
const globalState = ref("global state"); // 全局状态，所有组件共享
export default function useMyStore() {
  const localState = ref("local state"); // 局部状态，每个组件都会创建
  return {
    globalState,
    localState,
  };
}
```

这种方式一是不够灵活，二是可能造成[跨请求状态污染](https://cn.vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)，所以不适合用于大规模项目。

# 二、准备

## 1. 安装

```bash
pnpm install pinia
```

## 2. 配置

创建一个 pinia

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

创建一个 store

```typescript
// ./store/index.ts
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      name: "apple",
      count: 0,
    };
  },
  getters: {},
  actions: {},
});
```

在组件中访问

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useStore } from "./store/index.ts";
import { isReactive, isRef } from "vue";

const store = useStore(); // store是响应式对象
console.log(isReactive(store)); // true
console.log(isRef(store.count)); // false
</script>
```

# 三、使用

## 1. 访问状态

**不能对 `store` 对象进行解构，会破坏响应式**

```typescript
const { name, count } = store; // 失去响应性
```

可以通过 `storeToRefs()` 保持响应性

```typescript
import { storeToRefs } from "pinia";
import { useStore } from "./store/index.ts";
const store = useStore();
const { name, count } = storeToRefs(store); // 保持响应性
```



## 2. 修改状态

**1.1 直接修改**

```vue
<!-- App.vue -->
<template>
  <div>{{ store.name }} - {{ store.count }}</div>
  <button @click="change">+1</button>
</template>

<script setup lang="ts">
import { useStore } from "./store/index.ts";
const store = useStore();
function change() {
  store.count++;
}
</script>
```

**1.2 使用 `$path()` 进行批量修改（只修改对应的属性，非替换）**

```typescript
function change() {
  store.$patch({
    name: "banana",
    count: store.count + 1,
  });
}
```

也可以传入一个函数，用来处理逻辑。

```typescript
function change() {
  store.$patch(() => {
    ++store.count;
  });
}
```

**1.3 对整个 state 进行替换（需要写出所有的属性）**

```typescript
function change() {
  store.$state = {
    name: "egg",
    count: store.$state.count + 1,
  };
}
```

**1.4 通过 actions 中定义的方法进行修改**

通过函数可以实现同步或异步修改。

```typescript
// ./store/index.ts
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      name: "apple",
      count: 0,
    };
  },
  getters: {},
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

```typescript
function change() {
  store.increment();
}
```

## 3. actions

同步方法

```typescript
actions: {
  increment() {
    this.count++;
  },
},
```

异步方法

```typescript
actions: {
  async change() {
    const newFruit = await getFruit("banana"); // 等待异步函数
    this.name = newFruit.name;
    this.count = newFruit.count;
  },
},
```

## 4. getters 计算属性

```typescript
getters: {
  capName(): string {
    return this.name.toUpperCase();
  },
},
```

```vue
<template>
  <div>{{ store.name }} - {{ store.count }} - {{ store.capName }}</div>
</template>

<script setup lang="ts">
import { useStore } from "./store/index.ts";
const store = useStore();
</script>
```

## 5. store 对象上的 api

除了用于修改状态的 `$patch` 和 `$state` 以外，还有

5.1 `store.$reset()` 用于恢复到初始状态

5.2 [`store.$subscribe()`](https://pinia.vuejs.org/zh/core-concepts/state.html#subscribing-to-the-state) 侦听状态的变化

```typescript
store.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state); // 变化后的 state
});
```

5.3 [`store.$onAction()`](https://pinia.vuejs.org/zh/core-concepts/actions.html#subscribing-to-actions) 侦听 action

传递给 `$onAction()` 的回调函数会在 action 之前调用

```typescript
store.$onAction((args) => {
  console.log(args);
});
```

# 四、组合式 store

[组合式 store](https://pinia.vuejs.org/zh/core-concepts/#setup-stores)

可以以组合式函数的形式定义 store。在组合式函数中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

**注意：组合式 store 存在许多与选项式 store 不一样的暗坑（如 `$reset` 等方法需要手动定义，state 的响应式结构存在差异），目前不建议使用**

```typescript
// main.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTestStore = defineStore("test", () => {
  const name = ref("test");
  const count = ref(0);
  function change() {
    name.value += "g";
    ++count.value;
  }
  const capName = computed(() => name.value.toUpperCase());

  return {
    name,
    count,
    capName,
    change,
  };
});
```

# 五、持久化插件

pinia 保存的状态在页面刷新后会丢失，需要通过插件实现持久化。

```typescript
// persistedPiniaPlugin.ts
import { toRaw } from "vue";
import { PiniaPluginContext } from "pinia";

function setStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
}

interface PiniaPluginOptions {
  storageKey?: string;
}

const __defaultStorageKey__ = "pinia";

export default function persistedPiniaPlugin(options: PiniaPluginOptions | undefined) {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    // 为key添加指定的前缀
    let key = `${options?.storageKey ?? __defaultStorageKey__}-${store.$id}`;

    // 读取保存的状态
    // store.$state = getStorage(key);
    let state = getStorage(key);

    // 状态发生变化时保存
    store.$subscribe((mutation, state) => {
      setStorage(key, toRaw(state)); // toRaw(state) 用于获取原始对象
    });

    // 返回值的属性会被添加到 store 上
    return {
      ...state,
    };
  };
}
```

