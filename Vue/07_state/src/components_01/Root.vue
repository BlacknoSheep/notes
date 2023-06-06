<template>
  <div>
    <ul>
      <li><A></A></li>
      <li><B></B></li>
      <li><C></C></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import A from "./A.vue";
import B from "./B.vue";
import C from "./C.vue";

const count = ref(0);
function increment() {
  count.value++;
}
provide("rootProvide", { count, increment });
</script>
