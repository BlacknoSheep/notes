<template>
  <div>
    {{ studentStore }}
  </div>
  <div>{{ studentStore.name }} -- {{ studentStore.age }}</div>
  <div>{{ studentStore.skills }}</div>
  <div>
    <button @click="studentStore.name += `!`">直接修改name</button>
  </div>
  <div>
    <button @click="patchHandler">通过$patch修改</button>
  </div>
  <div>
    <button @click="patchHandler2">通过$patch传函数修改</button>
  </div>
  <div>
    <button @click="stateHandler">通过 $state 进行修改</button>
  </div>
  <div>
    <button @click="resetHandler">通过 $reset 进行重置</button>
  </div>
</template>

<script setup>
import { useStudentStore } from "./store/studentStore";
const studentStore = useStudentStore();

/*
  修改state
    1. 直接修改
    2. 通过 $patch 修改（可以同时修改多个属性）
    3. 通过 $patch 传函数的形式修改
    4. 通过 $state 进行修改
    5. 通过 $reset 进行重置
*/
function patchHandler() {
  studentStore.$patch({
    name: "cfm",
    skills: ["无"],
  });
}

function patchHandler2() {
  studentStore.$patch((state) => {
    state.skills.push("原");
  });
}

function stateHandler() {
  studentStore.$state = {
    name: "cfm",
  };
  // 等价于 studentStore.$patch({ name: "cfm" });
}

function resetHandler() {
  studentStore.$reset();
}
</script>

<style scoped></style>
