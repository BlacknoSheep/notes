<!-- 选项卡 -->
<template>
  <!-- 选项卡的外部容器 -->
  <div class="tab_warpper">
    <!-- 选项卡的头部 -->
    <header class="tab_head">
      <!-- 定义两个按钮 -->
      <div class="tab_button" :class="{ active: activeIndex === 0 }" @click="activeIndex = 0">热门球员</div>
      <div class="tab_button" :class="{ active: activeIndex === 1 }" @click="activeIndex = 1">热门球队</div>
    </header>
    <!-- 选项卡的主体 -->
    <div class="main">
      <!--
        v-show：控制元素的显示和隐藏
          v-show是通过display来控制元素的显示和隐藏的
      -->
      <!-- 球员 -->
      <div class="players" v-show="activeIndex === 0">
        <slot name="players"></slot>
      </div>

      <!-- 球队 -->
      <div class="teams" v-show="activeIndex === 1">
        <slot name="teams"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const activeIndex = ref(0); // 0：球员，1：球队
</script>

<style scoped>
.tab_warpper {
  width: 800px;
  background-color: rgb(45, 83, 211);
  padding: 20px;
}

.tab_head {
  display: flex;
  border-radius: 10px;
  /* tab_head由子元素撑开，子元素为矩形，角落会溢出 */
  overflow: hidden;
}

.tab_button {
  background-color: #fff;
  flex: auto;
  padding: 10px 0;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
}

.active {
  background-color: rgb(187, 3, 52);
  color: #fff;
  transition: 0.3s;
}
</style>
