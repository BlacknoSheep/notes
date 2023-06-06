<template>
  <slot name="slot1" :color="color1"></slot>
  <slot name="slot2" :color="color2"></slot>
</template>

<script setup>
const color1 = "#0f0";
const color2 = "#0ee";
</script>
