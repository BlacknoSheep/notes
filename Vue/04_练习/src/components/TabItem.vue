<!-- 热度列表的一行 -->
<template>
  <div class="tab_item">
    <!-- 图片 -->
    <Photo :src="item.img_path" :alt="item.name" :rank="item.rank" />
    <!-- 描述 -->
    <div class="desc">
      <span>{{ item.name }}</span>
      <HotBar :hot="item.hot" :max_hot="props.max_hot" />
    </div>
  </div>
</template>

<script setup>
import Photo from "./Photo.vue";
import HotBar from "./HotBar.vue";

/*
    子组件中的数据通常不会在子组件中直接定义，以免数据和视图耦合。
    通常会在父组件中定义数据，然后通过props属性传递给子组件。
*/
const props = defineProps(["item", "max_hot"]);
// console.log(props.item);
const item = props.item;
</script>

<style scoped>
.tab_item {
  display: flex;
  margin-bottom: 20px;
}

.desc {
  font-size: 30px;
  color: #fff;
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 30px;
}
</style>
