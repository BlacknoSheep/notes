# Vue介绍
- Vue 是一个前端框架，主要负责构建用户界面
- MVVM（Model-View-ViewModel）
- Vue 负责 VM 部分（视图模型）的工作，通过 Vue 可以将视图和模型相关联。
  - 模型发生变化时，视图会自动更新
  - 也可以通过视图去操作模型
- Vue 的特点：
  - 组件化开发
  - 声明式编程


# 使用Vue
1. 直接在网页中使用
   ```html
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   ```
2. 使用 vite

3. 组件化
vue一般采用单文件组件的方式：每个组件定义在一个单独的文件中（.vue）
    ```html
    <script></script>
    <template></template>
    ```

4. 自动生成项目
   ```bash
   pnpm create vue  # 创建项目
   pnpm i  # 安装依赖
   ```
