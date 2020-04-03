<template>
  <div class="parent">
    <post-list class="item" :posts="tops" />
    <post-detail class="item last" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostList from '~/components/PostList.vue';
import PostDetail from '~/components/PostDetail.vue';

export default {
  name: 'Home',
  components: {
    PostList,
    PostDetail,
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
  overflow: hidden;
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

<style scoped>
  .parent {
    display: flex;
  }

  .item {
    width: 50%;
    color: #fff;
    background: #fff;
    box-shadow: 1px 2px 12px 0 rgba(102, 107, 135, 0.27);
  }

  .last {
    width: 50%;
    color: #222;
    background: #fff;
  }

  @media screen and (max-width: 600px){

    .parent {
      flex-direction: column-reverse;
    }

    .item {
      width: auto;
      min-height: 200px;
    }

    .last {
      background: #fff;
    }

  }
</style>
