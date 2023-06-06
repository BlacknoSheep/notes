<template>
  <Tab>
    <!-- 球员 -->
    <template #players>
      <TabList :items="players"></TabList>
    </template>

    <!-- 球队 -->
    <template #teams>
      <TabList :items="teams"></TabList>
    </template>
  </Tab>
</template>

<script setup>
import Tab from "./components/Tab.vue";
import TabList from "./components/TabList.vue";

const players = [
  {
    name: "梅西",
    img_path: "/images/messi.png",
    hot: 433760,
    rank: 1,
  },
  {
    name: "C罗",
    img_path: "/images/ronaldo.png",
    hot: 333760,
    rank: 2,
  },
  {
    name: "内马尔",
    img_path: "/images/neymar.png",
    hot: 233760,
    rank: 3,
  },
];

const teams = [
  {
    name: "法国队",
    img_path: "/images/法国.jpg",
    hot: 333760,
    rank: 1,
  },
  {
    name: "巴西队",
    img_path: "/images/巴西.jpg",
    hot: 233760,
    rank: 2,
  },
  {
    name: "荷兰队",
    img_path: "/images/荷兰.jpg",
    hot: 133760,
    rank: 3,
  },
];
</script>

<style scoped></style>
