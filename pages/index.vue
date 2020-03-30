<template>
  <post-list :posts="tops" />
</template>

<script>
import { mapState } from 'vuex';
import PostList from '~/components/PostList.vue';

export default {
  name: 'Home',
  components: {
    PostList,
  },
  async asyncData({ store: { dispatch } }) {
    return dispatch('getTopPosts');
  },
  computed: {
    ...mapState(['tops']),
  },
};
</script>

<style>
.container {
  align-items: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
