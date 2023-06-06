<template>
  <Tree :data="data"></Tree>
</template>

<script setup>
import Tree from "./Tree.vue";
const data = [
  {
    name: "1",
    checked: false,
    children: [],
  },
  {
    name: "2",
    checked: false,
    children: [
      {
        name: "2-1",
        checked: false,
        children: [],
      },
    ],
  },
  {
    name: "3",
    checked: false,
    children: [
      {
        name: "3-1",
        checked: false,
        children: [
          {
            name: "3-1-1",
            checked: false,
            children: [],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped></style>
