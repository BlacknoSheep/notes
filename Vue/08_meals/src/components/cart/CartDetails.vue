<template>
  <Mask :style="`z-index: 99`">
    <div class="cart-details">
      <div class="header">
        <h2>餐品详情</h2>
        <a href="javascript:;" @click.prevent="showDialog">
          <i class="ri-delete-bin-line"></i>
          清空购物车
        </a>
      </div>
      <div class="cart-meals">
        <Meal v-for="item in mealsStore.cart_meals" :meal="item"></Meal>
      </div>
    </div>

    <Dialog
      :style="`z-index: 9999`"
      :is-show="isShowDialog"
      :msg="msg"
      @ok="okHandler"
      @cancel="isShowDialog = false"></Dialog>
  </Mask>
</template>

<script setup>
import { ref } from "vue";
import Mask from "../ui/Mask.vue";
import Meal from "../meals/Meal.vue";
import Dialog from "../ui/Dialog.vue";
import { useMealsStore } from "../../store/mealsStore";

const mealsStore = useMealsStore();
const isShowDialog = ref(false);
const msg = ref("确认清空购物车吗？");

function showDialog() {
  isShowDialog.value = true;
}

function okHandler() {
  mealsStore.clearCart();
  isShowDialog.value = false;
}
</script>

<style scoped>
.cart-details {
  width: 750rem;
  min-height: 20vh;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 40rem;
  border-top-right-radius: 40rem;
}

.cart-meals {
  max-height: 70vh;
  overflow: auto;
  padding-bottom: 140rem;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20rem 40rem 10rem 40rem;
}

.header h2 {
  font-size: 28rem;
}

.header a {
  display: flex;
  align-items: center;
  color: #9f9f9f;
  font-size: 22rem;
}
</style>
