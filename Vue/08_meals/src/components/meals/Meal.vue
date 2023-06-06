<template>
  <div class="meal">
    <div class="img">
      <img :src="props.meal.img" :alt="props.meal.title" />
    </div>
    <div class="info">
      <div class="desc">
        <h2>{{ props.meal.title }}</h2>
        <p v-show="props.showDesc">{{ props.meal.desc }}</p>
      </div>
      <div class="price-warpper">
        <span class="price">{{ props.meal.price }}</span>
        <Counter :meal="meal"></Counter>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Counter from "../ui/Counter.vue";
const props = defineProps(["meal", "showDesc"]);
</script>

<style scoped>
.meal {
  height: 280rem;
  border-bottom: 1px #e6e6e6 solid;
  display: flex;
  align-items: center;
  padding: 0 20rem;
}

.img {
  width: 200rem;
}

.info {
  width: 450rem;
  margin-left: 20rem;
}

.info h2 {
  color: #000;
  font-size: 30rem;
  font-weight: normal;
}

.info p {
  font-size: 24rem;
  color: #9f9f9f;
}

.price-warpper {
  display: flex;
  margin-top: 40rem;
  justify-content: space-between;
}

.price {
  font-size: 30rem;
  font-weight: bold;
}

.price::before {
  content: "￥";
}
</style>
