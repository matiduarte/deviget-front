<template>
  <div v-if="selectedPost">
    <div class="detail-card">
      <div>
        <img v-lazy="selectedPost.thumbnail" :alt="selectedPost.title" style="width:100%">
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

</style>
