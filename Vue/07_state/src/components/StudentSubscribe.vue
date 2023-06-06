<template>
  <div>
    <div>
      {{ studentStore }}
    </div>
    <div>{{ studentStore.name }} -- {{ studentStore.age }}</div>
    <div>{{ studentStore.skills }}</div>
    <div>
      <button @click="studentStore.growUp">growUp</button>
    </div>
    <div>
      <button @click="patchHandler">patchHandler</button>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from "../store/studentStore.js";
const studentStore = useStudentStore();

function patchHandler() {
  studentStore.$patch({
    name: "ss",
  });
}

/*
  store 的订阅
    - 当 store 中的数据发生变化时，做一些响应的操作
    - 默认情况下，订阅绑定在定义订阅的组件上，当组件被卸载时，订阅也会被自动删除
      若想保留订阅，在第二个参数（配置对象）中设置 detached: true
    - 使用订阅时，不要再回调函数中修改 state ，否则会导致死循环
*/
studentStore.$subscribe(
  (mutation, state) => {
    console.log("store 中的数据发生了变化");
    // console.log(state.name);
    // console.log("mutation: ", mutation); // 关于修改的信息
    // console.log("storeId: ", mutation.storeId); // store 的 id
    // console.log("type: ", mutation.type); // 修改的类型  'direct' | 'patch object' | 'patch function'
    // console.log("payload: ", mutation.payload); // $patch 中传递的对象
  },
  {
    detached: true,
  }
);

// 监听 action
studentStore.$onAction(({ name, store, args, after, onError }) => {
  console.log("action 被调用了");
  console.log(name); // 调用的 action 的名字
  console.log(store); // 调用的 action 所属的 store 实例
  console.log(args); // 调用 action 时传递的参数
  console.log(after); // 可以设置一个回调函数，当 action 成功执行完毕后，会调用该函数
  console.log(onError); // 可以设置一个回调函数，当 action 执行出错时，会调用该函数

  after(() => {
    console.log("action 成功执行完毕！");
  });

  onError((err) => {
    console.log("action 执行出错了！");
    console.log(err);
  });
});
</script>
