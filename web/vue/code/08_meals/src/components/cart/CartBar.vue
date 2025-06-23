<template>
  <CartDetails :is-show="showDetails" @hide="() => (showDetails = false)"></CartDetails>
  <div class="cart-bar">
    <div class="cart-bag" @click="showDetails = true">
      <img :src="cart_bag_img" alt="cart bag" />
      <span class="total-count" v-show="mealsStore.total_count > 0">{{ mealsStore.total_count }}</span>
    </div>
    <div class="total-amount">
      <div class="no-goods" v-show="mealsStore.total_count <= 0">未选购商品</div>
      <div class="has-goods" v-show="mealsStore.total_count > 0">{{ mealsStore.total_price }}</div>
    </div>
    <button class="checkout">去结算</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import cart_bag_img from "../../assets/bag.png";
import { useMealsStore } from "../../store/mealsStore";
import CartDetails from "./CartDetails.vue/";
const mealsStore = useMealsStore();
const showDetails = ref(false);
</script>

<style scoped>
.cart-bar {
  width: 710rem;
  height: 100rem;
  background-color: rgb(58, 58, 58);
  position: fixed;
  bottom: 40rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 50rem;
  z-index: 999;
}

.cart-bag {
  width: 100rem;
  position: absolute;
  bottom: -10rem;
}

.total-count {
  width: 40rem;
  height: 40rem;
  text-align: center;
  line-height: 40rem;
  color: #fff;
  font-weight: bold;
  background-color: red;
  position: absolute;
  border-radius: 50%;
  right: -20rem;
}

.total-amount {
  line-height: 100rem;
  margin-left: 160rem;
}

.no-goods,
.has-goods {
  color: rgb(148, 148, 148);
  font-size: 36rem;
  font-weight: bold;
}

.has-goods {
  color: #fff;
}

.has-goods::before {
  content: "￥";
}

.checkout {
  position: absolute;
  top: 0;
  right: 0;
  width: 200rem;
  height: 100rem;
  border-radius: 50rem;
  border: none;
  background-color: rgb(248, 188, 0);
  font-size: 36rem;
}
</style>
