<template>
  <div class="counter">
    <template v-if="props.meal.count > 0">
      <button class="sub" @click="mealsStore.removeMealFromCart(props.meal)"><i class="ri-subtract-line"></i></button>
      <span class="count">{{ props.meal.count }}</span>
    </template>
    <button class="add" @click="mealsStore.addMealToCart(props.meal)"><i class="ri-add-line"></i></button>
  </div>
</template>

<script setup>
import { useMealsStore } from "../../store/mealsStore";
const mealsStore = useMealsStore();
const props = defineProps(["meal"]);
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
}

.sub,
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36rem;
  height: 36rem;
  background-color: rgb(234, 178, 0);
  border: none;
  border-radius: 50%;
  font-size: 36rem;
  font-weight: bold;
}

.sub {
  background-color: #fff;
  border: 1px #000 solid;
}

.count {
  font-size: 30rem;
  margin: 0 10rem;
}
</style>
