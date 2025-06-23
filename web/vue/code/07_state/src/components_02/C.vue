<template>
  <div>
    <span>C组件 -- {{ countStore.count }} -- </span>
    <button @click="countStore.increment">+1</button>
  </div>
</template>

<script setup>
import { countStore } from "../store/count.js";
</script>
