<template>
  <div class="warpper">
    <div
      :style="{
        height: item.height + `px`,
        background: item.background,
        top: item.top + `px`,
        left: item.left + `px`,
      }"
      class="item"
      v-for="item in waterList"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
const props = defineProps(["list"]);
const waterList = reactive([]);
const heightList = reactive([]);

function init() {
  waterList.splice(0, waterList.length);
  heightList.splice(0, heightList.length);

  const width = 90;
  const clientWidth = document.body.clientWidth;
  const columns = Math.floor(clientWidth / width);
  console.log(columns);

  for (let i = 0; i < props.list.length; i++) {
    if (i < columns) {
      props.list[i].top = 10;
      props.list[i].left = i * width;
      waterList.push(props.list[i]);
      heightList.push(props.list[i].height + 10);
    } else {
      let minIdx = 0;
      heightList.forEach((item, idx) => {
        if (item < heightList[minIdx]) {
          minIdx = idx;
        }
      });
      props.list[i].top = heightList[minIdx] + 10;
      props.list[i].left = minIdx * width;
      waterList.push(props.list[i]);
      heightList[minIdx] += props.list[i].height + 10;
    }
  }
}

onMounted(() => {
  init();
  window.onresize = () => {
    init();
  };
});
</script>

<style scoped lang="scss">
.warpper {
  position: relative;
  .item {
    position: absolute;
    width: 80px;
  }
}
</style>
