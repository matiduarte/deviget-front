<template>
  <div class="post-card" @click="setPost(post)">
    <div class="card-img">
      <img v-lazy="post.thumbnail" :alt="post.title" height="100%" width="100%">
    </div>
    <div class="post-card-content">
      <div class="post-header">
        <div :class="{'read-status': !post.read}"></div>
        <div>{{ `Posted by ${post.author}` }}</div>&nbsp;
        <div>{{ `${createdPost} hours ago` }}</div>
        <div class="close-btn">&times;</div>
      </div>
      <div class="post-title">
        {{ post.title }}
      </div>
      <div class="post-comments">
        {{ `${post.comments} comments` }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
  methods: {
    ...mapActions(['setSelectedPost']),
    setPost(post) {
      this.setSelectedPost(post);
    },
  },
};
</script>

<style scoped>
  .post-card {
    min-height: 110px;
    max-height: 110px;
    display: flex;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
  }
  .post-card-content {
    padding: 5px 10px;
    flex: 1;
    align-self: stretch;
  }
  .card-img {
    width: 100px;
    min-width: 100px;
    height: auto;
  }
  .post-title {
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    color: #000000;
    padding-right: 25px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .post-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: rgb(120, 124, 126);
  }
  .post-comments {
    align-self: flex-end;
    font-size: 12px;
    font-weight: bold;
    color: #447ac4;
  }
  .read-status {
    height: 8px;
    width: 8px;
    margin-right: 4px;
    border-radius: 50%;
    background-color: #44c7c7;
  }
  .close-btn {
    cursor: pointer;
    margin-left: auto;
    margin-right: 10px;
    font-size: 18px;
  }

  .close-btn:hover {color: #000;}
</style>
