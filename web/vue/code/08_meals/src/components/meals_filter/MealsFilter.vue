<template>
  <div class="filter-warpper">
    <div class="filter">
      <i class="ri-search-line"></i>
      <input type="text" class="filter-input" placeholder="请输入关键字" v-model="mealsStore.keyword" />
    </div>
  </div>
</template>

<script setup>
import { useMealsStore } from "../../store/mealsStore";
const mealsStore = useMealsStore();
</script>

<style scoped>
.filter-warpper {
  height: 120rem;
  padding: 20rem 40rem;
  border-bottom: 1px #e6e6e6 solid;
}

.filter {
  display: flex;
  align-items: center;
  height: 80rem;
  position: relative;
}

.filter-input {
  width: 100%;
  height: 100%;
  border-radius: 40rem;
  border: none;
  background-color: rgb(242, 242, 242);
  outline: none;
  padding: 0 40rem 0 80rem;
}

.filter i {
  color: rgb(184, 184, 184);
  font-size: 30rem;
  position: absolute;
  left: 30rem;
}
</style>
