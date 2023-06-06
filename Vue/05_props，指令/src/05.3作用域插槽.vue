<template>
  <h1>我是App组件</h1>
  <ChildComponent v-slot="child_props">
    <div>{{ App_msg }}</div>
    <div>{{ child_props.child_msg }}</div>
  </ChildComponent>
  <hr />
  <button @click="diameter = `50px`">50px</button>
  <button @click="diameter = `100px`">100px</button>
  <button @click="diameter = `200px`">200px</button>
  <ColorSlots>
    <template #slot1="props">
      <Circle :color="props.color" :diameter="diameter" />
    </template>
    <template #slot2="props">
      <Circle :color="props.color" :diameter="diameter" />
    </template>
  </ColorSlots>
</template>

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";
import ColorSlots from "./components/ColorSlots.vue";
import Circle from "./components/Circle.vue";
const App_msg = "我是App组件作用域的数据";

// 直径
const diameter = ref("100px");
</script>

<style scoped>
* {
  color: red;
}
</style>
