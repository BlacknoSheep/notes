<template>
  <div>
    B组件 --
    {{ countStore }} -- {{ countStore.count }} --
    {{ countStore.double }}
  </div>
</template>

<script setup>
import { useCountStore } from "../store/countStore.js";
const countStore = useCountStore();
</script>
