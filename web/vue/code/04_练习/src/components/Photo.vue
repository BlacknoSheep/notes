<!-- 头像图片（包括排名数字） -->
<template>
  <!-- 图片 -->
  <div class="photo">
    <img :src="props.src" :alt="props.name" />
    <span>{{ props.rank }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["src", "alt", "rank"]);

/*
  第一名：(254, 45, 70)
  第二名：(245, 102, 1)
  第三名：(247, 169, 1)
*/
const color = computed(() => {
  if (props.rank === 1) {
    return "rgb(254, 45, 70)";
  } else if (props.rank === 2) {
    return "rgb(245, 102, 1)";
  } else {
    return "rgb(247, 169, 1)";
  }
});
// const color = "rgb(254, 45, 70)";
</script>

<style scoped>
.photo {
  width: 150px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.photo img {
  width: 100%;
  vertical-align: top;
}

.photo span {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: v-bind(color);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 20px;
}
</style>
