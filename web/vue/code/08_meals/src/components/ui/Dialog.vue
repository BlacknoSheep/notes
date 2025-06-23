<template>
  <Mask>
    <div class="dialog">
      <div class="msg">{{ msg }}</div>
      <div class="btn">
        <button class="btn-cancel" @click="$emit('cancel')">取消</button>
        <button class="btn-ok" @click="$emit('ok')">确认</button>
      </div>
    </div>
  </Mask>
</template>

<script setup>
import Mask from "./Mask.vue";
const props = defineProps(["msg"]);
const emit = defineEmits(["ok", "cancel"]);
</script>

<style scoped>
.dialog {
  position: absolute;
  width: 700rem;
  height: 400rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 40rem;
}

.msg {
  font-size: 40rem;
  text-align: center;
  height: 260rem;
  line-height: 260rem;
}

.btn {
  display: flex;
  justify-content: space-around;
}

.btn button {
  width: 200rem;
  height: 80rem;
  border-radius: 40rem;
  border: 1px solid #000;
  background-color: #fff;
  font-size: 32rem;
}

.btn .btn-ok {
  background-color: rgb(248, 188, 0);
  border: none;
}
</style>
