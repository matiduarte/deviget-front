<template>
  <div v-if="selectedPost">
    <div class="detail-card">
      <div>
        <img :src="selectedPost.thumbnail" :alt="selectedPost.thumbnail" style="width:100%">
      </div>
      <div class="detail-container">
        <h4><b>{{ selectedPost.title }}</b></h4>
        <p>{{ selectedPost.comments }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostDetail',
  computed: {
    ...mapState(['selectedPost']),
  },
};
</script>

<style scoped>
  .detail-container {
    padding: 2px 16px;
  }
  .detail-card {
    border-radius: 5px;
    display: block;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 20%;
  }

  .detail-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

</style>
