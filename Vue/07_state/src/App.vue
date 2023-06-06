<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
  </div>
  <hr />
  <StudentSubscribe v-if="isShow"></StudentSubscribe>
</template>

<script setup>
import { ref } from "vue";
import StudentSubscribe from "./components/StudentSubscribe.vue";
const isShow = ref(true);
</script>

<style scoped></style>
