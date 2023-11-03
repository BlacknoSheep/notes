# 一、准备

https://router.vuejs.org/zh/

## 1. 安装

```bash
pnpm install vue-router
```

## 2. 配置路由

定义路由，创建 router 实例

```typescript
// ./router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 定义路由（route）
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    // 访问 /login 时加载 Login 组件
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../components/Register.vue"),
  },
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(),
  routes: routes, // 可缩写为 routes
});

export default router;
```

挂载 router 

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router); // 挂载路由实例
app.mount("#app");
```

使用路由，路由组件将会被渲染到 `<RouterView>` 的位置。

```vue
<!-- App.vue -->
<template>
  <div>
    <h1>哈哈哈</h1>
    <!-- 显示路由导向的组件 -->
    <!-- 以下两种写法都可以 -->
    <router-view></router-view>
    <RouterView></RouterView>
  </div>
</template>
```

切换路由

`/` 表示根url（`http://localhost:5173`），若不加或使用 `./` 则是相对url，相对于当前目录，如从`http://localhost:5173/a/b` 页面点击 `c` ，则会跳转到 `http://localhost:5173/a/c` 。

由于相对url在不同页面会有不同的值，最好避免使用。

```vue
<template>
  <div>
    <h1>哈哈哈</h1>
    <!-- 会创建 <a> 标签（但是点击后不会刷新页面） -->
    <RouterLink to="/login">Login</RouterLink>
    <!-- 两种写法都可以 -->
    <router-link to="/register">Register</router-link>
    <RouterView></RouterView>
  </div>
</template>
```

# 二、[不同历史模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

## 1. hash 模式

```typescript
// ./router/index.ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
```

通过修改 `location.hash` 实现，hash 是 url 中 `#` 以及其后面的部分，改变 url 的 hash 部分不会触发页面刷新。

此时访问 `http://localhost:5173/` 时，会自动在后面添加 `#/` ，如访问 `login` 路由：`http://localhost:5173/#/login`

## 2. history 模式

```typescript
// ./router/index.ts
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
```

基于 html5 的 `history` 实现。

# 三、命名路由

可以为路由定义名称，通过名称进行跳转，免去写路由路径。

```typescript
// ./router/index.ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
];
```

```vue
<!-- App.vue -->
<template>
  <div>
    <RouterLink :to="{ name: `login` }">Login</RouterLink>
    <RouterView></RouterView>
  </div>
</template>
```

# 四、 在 js 中使用

```vue
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function toPage(path: string) {
  router.push(path);
  // 对象形式
  // router.push({
  //   path: path,
  // });
  // 命名路由
  // router.push({
  //   name: "login",
  // });
}
</script>
```

# 五、历史记录

## 1. 消除历史记录

通过给 `<RouterLink>` 添加 `replace` 属性可以消除历史记录

```vue
<RouterLink replace to="/login">Login</RouterLink>
```

如果在 js 中使用：

```typescript
function toPage(path: string) {
  router.replace(path);
}
```

## 2. 历史记录跳转

```typescript
function toForward() {
  router.go(1);
}
function toBack() {
  // router.go(-1);
  // 或者
  router.back();
}
```

# 六、路由传参

## 1. query 传参

```typescript
function toDetail(item: TuberInfo) {
  router.push({
    path: "/detail",
    // 会以索引字符串的形式出现在url中，如
    // http://localhost:5173/detail?name=Taffy&age=17&address=bilibili
    query: {
      name: item.name,
      age: item.age,
      address: item.address,
    },
  });
}
```

接收参数

```typescript
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.query);
```

## 2. params 传参

**由于刷新时会丢失数据，[已被弃用](https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22)**

# 七、嵌套路由

```typescript
const routes: Array<RouteRecordRaw> = [
  // ...
  {
    path: "/user",
    component: () => import("../components/InfoDetail.vue"),
    // 子路由，在访问时需要加上父路由的前缀，如 to="user/login"
    children: [
      {
        path: "login", // 注意：不要加上 / ，/ 表示根url
        component: () => import("../components/Login.vue"),
      },
      {
        path: "register",
        component: () => import("../components/Register.vue"),
      },
    ],
  },
];
```

# 八、命名视图

```typescript
// ./router/index.ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/user1",
    components: {
      default: () => import("../components/A.vue"), // 默认组件
    },
  },
  {
    path: "/user2",
    components: {
      compA: () => import("../components/B.vue"),
      compB: () => import("../components/C.vue"),
    },
  },
];
```

设置了名称的路由组件会渲染到具有对应名称的命名视图，未定义的命名视图不会显示，如下方当点击 `user1` 时，只会显示默认组件。

```vue
<!-- App.vue -->
<template>
  <div>
    <h1>哈哈哈</h1>
    <RouterLink to="/user1">user1</RouterLink>
    <RouterLink to="/user2">user2</RouterLink>
    <RouterView></RouterView> <!-- 默认 name="default" -->
    <RouterView name="compA"></RouterView>
    <RouterView name="compB"></RouterView>
  </div>
</template>
```

# 九、重定向-别名

```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // 路由重定向
    // redirect: "/user1",
    // 对象模式
    // redirect: {
    //   path: "/user1", // 如果使用命名路由 name: 'user1'
    // },
    redirect: (to) => {
      console.log(to); // **当前路由**的信息
      return "user1"; // 或者返回一个对象
    },
    component: () => import("../components/Home.vue"),
    children: [
      {
        name: "user1",
        path: "user1",
        components: {
          default: () => import("../components/A.vue"),
        },
      },
    ],
  },
];
```

可以在重定向中添加查询字符串

```typescript
redirect: {
  path: "/user1",
  query: {
    name: "Taffy",
    age: 17,
  },
},
```

**别名：**可以为路由设置别名，通过别名也可以访问路由

```typescript
// 此时访问 http://localhost:5173 和 http://localhost:5173/main 均会走此路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/main",
    component: () => import("../components/Home.vue"),
];
```

# 十、[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

作用类似于中间件，在跳转到下一个路由前调用。

## 1. `router.beforeEach()`

用于注册全局前置守卫，会在所有路由（包括根路由）前调用。多个前置守卫会依次调用，直至结束或返回 `false` 。

```typescript
router.beforeEach((to, form) => {
  // to: 目标路由， form: 源路由
  console.log(to, form);

  // 返回 false 时，中断导航，不会实际跳转到目标路由（但是后置守卫依然会触发）
  // 返回 true 时，依次调用下一个守卫
  return true;
});
```

**第三个参数 `next` 不建议使用。**

## 2. `router.afterEach()` 

用于注册全局后置守卫，多个后置守卫会依次调用（**总是会调用**）。

```typescript
router.beforeEach((to, form) => {
  console.log("000");
  return true;
});
```

# 十一、路由元信息

通过路由元信息可以给路由添加自定义属性。

```typescript
// 声明 meta 属性的类型
declare module "vue-router" {
  interface RouteMeta {
    info: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/Login.vue"),
    meta: {
      info: "登录",
    },
  },
];
```

```typescript
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.meta);
```

# 十二、路由过渡动效

## 1. Transition

通过 vue 的 v-slot 指令和 `<Transition>` 组件实现。

以下动画会应用到所有路由组件。

 ```vue
 <template>
   <!-- Component: 当前路由组件，传递给插槽，在当前组件（App.vue）中不可见 -->
   <RouterView v-slot="{ Component }">
     <Transition enter-active-class="animate__animated animate__backInDown">
       <!-- 使用动态组件，Component 在插槽所在作用域访问 -->
       <component :is="Component"></component>
     </Transition>
   </RouterView>
 </template>
 ```

如果想只作用于特定组件，可以通过在路由元信息中设置标记，然后在 `<Transition>` 的属性中进行判断。

```vue
<!--
为路由元信息中设置了 name: "login" 的路由组件使用单独的动效，其他组件使用默认的动效
-->
<template>
  <!-- Component: 当前路由组件，传递给插槽，在当前组件（App.vue）中不可见 -->
  <!-- route: 当前路由 -->
  <RouterView v-slot="{ Component, route }">
    <Transition
      :enter-active-class="
        route.meta.name == 'login' ? 'animate__animated animate__backInDown' : 'animate__animated animate__fadeInLeft'
      ">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>
```

当然，也可以将过渡类放到路由元信息中同一进行管理。

```typescript
// ./router/index.ts
// 声明 meta 属性的类型
declare module "vue-router" {
  interface RouteMeta {
    name: string;
    transition: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/Login.vue"),
    meta: {
      name: "login",
      transition: "animate__animated animate__backInDown",
    },
  },
  {
    path: "/index",
    component: () => import("../components/Index.vue"),
    meta: {
      name: "index",
      transition: "animate__animated animate__fadeInLeft",
    },
  },
];
```

```vue
<!-- App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :enter-active-class="route.meta.transition">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>
```

## 2. 滚动行为

控制切换到新路由时，滚动条的位置。

```typescript
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 返回期望滚动到的位置
    if (savedPosition) {
      // 按下后退/前进按钮，回到原来的位置（即浏览器的默认行为）
      return savedPosition;
    } else {
      // 如果不是通过上述行为切换组件，就会让页面回到顶部
      return {
        left: 0,
        top: 0,
        behavior: "smooth", // 即 css 中的 `scroll-behavior: smooth`
      };
    }
  },
});
```

可以通过返回一个promise来实现延迟滚动，如需要在动画结束后再进行滚动。

```typescript
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 9999 });
      }, 2000);
    });
  },
});
```

# 十三、动态路由

```typescript
router.addRoute({ name: 'admin', path: '/admin', component: Admin }) // 动态添加路由
router.addRoute('admin', { path: 'settings', component: AdminSettings }) // 动态添加子路由
```

添加同 name 的路由时，会先删除旧的，再添加新的。

