# 状态管理
- 状态（state）
  - 应用中的数据就是状态。
- 视图（view）
  - 视图用来呈现数据，用户通过视图访问数据。
- 交互（action）
  - 用户的操作。
  - 状态会根据用户在视图中的操作发生变化

<hr/>

多个组件需要共享一个共同的状态时：  
- 方案一：将共享状态“提升”到共同的祖先组件上去（如通过依赖注入）
  ```javascript
  // 共同祖先组件
  provide("rootProvide", { count, increment });

  // 后代组件
  const { count, increment } = inject("rootProvide");
  ```

- 方案二：将共享状态放入一个单独的外部文件中

- 方案三：使用 Pinia 进行管理
