<template>
  <div class="post-card">
    <div class="card-img">
      <img v-lazy="post.thumbnail" :alt="post.title" height="100%" width="100%">
    </div>
    <div class="post-card-content">
      <div class="post-header">
        <span>{{ `Posted by ${post.author}` }}</span>
        <span>{{ `${createdPost} hours ago` }}</span>
      </div>
      <div class="post-title">{{ post.title }}</div>
      <div class="post-comments">{{ `${post.comments} comments` }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: { type: Object, default: null },
  },
  computed: {
    createdPost() {
      const { created } = this.post;
      const postTime = new Date(created * 1000);
      const dateNow = new Date();
      return Math.round(Math.abs(postTime - dateNow) / 36e5);
    },
  },
};
</script>

<style scoped>
  .post-card {
    display: flex;
    background-color: #fff;
    margin-bottom: 2px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .post-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .post-card-content {
    padding: 5px;
  }
  .card-img {
    width: 100px;
    height: 100px;
    min-width: 100px;
  }
  .post-title {
    font-weight: bold;
    font-size: 16px;
    color: #000000;
  }
  .post-header {
    font-size: 12px;
    color: rgb(120, 124, 126);
  }
  .post-comments {
    font-size: 13px;
    font-weight: bold;
    color: #447ac4;
  }
</style>
