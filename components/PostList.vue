<template>
  <div>
    <transition-group name="fade">
      <div v-for="post in posts" :key="post.created">
        <div class="card-transition" :class="{'dismiss-all': dismissAll}">
          <post :post="post" />
        </div>
      </div>
    </transition-group>
    <div class="btn-footer" @click="dismissAllCards()">
      {{ `${textBtn} all` }}
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
      dismissAll: false,
    };
  },
  computed: {
    textBtn() {
      return this.dismissAll ? 'Show' : 'Dismiss';
    },
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
    ...mapActions(['loadPosts', 'setSelectedPost']),
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
    dismissAllCards() {
      this.setSelectedPost(null);
      this.dismissAll = !this.dismissAll;
    },
  },
};
</script>

<style scoped>
  .fade-leave-active {
    transition: all 1s;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .btn-footer {
    display: block;
    background: #FF5700;
    height: 45px;
    padding-top: 12px;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    z-index: 6;
    position: sticky;
    bottom: 0;
  }
  .btn-footer:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .card-transition {
    transition: all 0.5s ease;
  }
  .dismiss-all {
    transform: translate(-150%);
    -webkit-transform: translate(-150%);
  }
</style>
