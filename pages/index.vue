<template>
  <div class="container">
    <div v-for="(top, index) in tops" :key="index">
      <img :src="top.thumbnail" :alt="top.title">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
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
  margin: 82px auto 32px;
  padding: 0 16px;
  max-width: 960px;
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
