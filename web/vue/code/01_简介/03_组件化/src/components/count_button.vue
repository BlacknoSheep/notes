<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<template>
  <div>
    <button @click="count++">点击</button>
    <span>当前计数：{{ count }}</span>
  </div>
</template>
