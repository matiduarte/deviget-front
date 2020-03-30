<template>
  <div style="display: flex; margin-bottom: 10px">
    <div style="width: 80px; height: 80px;">
      <img v-lazy="post.thumbnail" :alt="post.title" height="100%" width="100%">
    </div>
    <div>{{ post.thumbnail }}</div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: { type: Object, default: null },
  },
};
</script>

<style scoped>

</style>
