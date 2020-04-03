<template>
  <div>
    <div v-for="post in posts" :key="JSON.stringify(post.title)">
      <post :post="post" />
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Post from '~/components/Post.vue';

export default {
  name: 'PostList',
  components: {
    Post,
  },
  props: {
    posts: { type: Array, default: () => [] },
  },
  data() {
    return {
      active: true, // Prevent multiple requests
      bottom: false,
      OFFSET: 200,
    };
  },
  watch: {
    bottom(bottom) {
      if (bottom && this.active) {
        this.active = false;
        setTimeout(() => {
          this.loadPosts();
          this.active = true;
        }, 200);
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    ...mapActions(['loadPosts']),
    scrollEvent() {
      this.bottom = this.bottomVisible();
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY + this.OFFSET >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
  },
};
</script>

<style scoped>
  .line {
    border-bottom: 1px solid rgba(51, 51, 51, 0.2);
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
