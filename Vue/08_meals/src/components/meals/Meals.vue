<template>
  <!-- 所有汉堡的容器 -->
  <div class="meals">
    <!-- 显示商品信息 -->
    <Meal v-for="item in props.meals" :meal="item"></Meal>
    <template v-if="props.meals.length === 0">
      <div class="empty">没有找到指定的商品！</div>
    </template>
  </div>
</template>

<script setup>
import Meal from "./Meal.vue";
const props = defineProps(["meals"]);
</script>

<style scoped>
.meals {
  height: calc(100vh - 120rem);
  overflow: auto;
  padding-bottom: 140rem;
}

.empty {
  font-size: 30rem;
  text-align: center;
  padding-top: 10rem;
  color: #999;
}
</style>
