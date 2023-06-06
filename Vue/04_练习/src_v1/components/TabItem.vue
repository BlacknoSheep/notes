<script setup>
/*
    子组件中的数据通常不会再子组件中直接定义，以免数据和视图耦合。
    通常会在父组件中定义数据，然后通过props属性传递给子组件。
*/
const props = defineProps(["item"]);
// console.log(props.item);
const item = props.item;
</script>

<template>
  <div class="tab_list">
    <div class="tab_item">
      <!-- 图片 -->
      <div class="photo">
        <img :src="item.img_path" :alt="item.name" />
        <span>{{ item.rank }}</span>
      </div>
      <!-- 描述 -->
      <div class="desc">
        <span>{{ item.name }}</span>
        <div class="hot_bar">
          <div class="inner">{{ item.hot }}热度</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab_list {
  margin: 20px;
}

.tab_item {
  display: flex;
  margin-bottom: 20px;
}

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
  background-color: rgb(245, 102, 1);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 20px;
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

.hot_bar {
  border-radius: 20px;
  background-color: rgb(3, 37, 103);
  text-indent: 0.5em;
  overflow: hidden;
}

.inner {
  width: 10%;
  background-image: linear-gradient(90deg, rgb(187, 3, 52) 50%, rgb(66, 2, 12));
  border-radius: 20px;
  /* 文字不换行 */
  white-space: nowrap;
}
</style>
