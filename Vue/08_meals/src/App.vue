<template>
  <MealsFilter></MealsFilter>
  <Meals :meals="mealsStore.filtered_meals"></Meals>
  <CartBar></CartBar>
</template>

<script setup>
import Meals from "./components/meals/Meals.vue";
import MealsFilter from "./components/meals_filter/MealsFilter.vue";
import CartBar from "./components/cart/CartBar.vue";
import { useMealsStore } from "./store/mealsStore.js";
const mealsStore = useMealsStore();
</script>

<style scoped></style>
