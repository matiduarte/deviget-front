<template>
  <div style="margin-top: 6px">
    <div v-for="post in posts" :key="JSON.stringify(post.title)">
      <post :post="post" />
    </div>
  </div>
</template>

<script>
import Post from '~/components/Post.vue';

export default {
  name: 'PostList',
  components: {
    Post,
  },
  props: {
    posts: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>

</style>
