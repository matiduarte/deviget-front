<template>
  <div class="gallery-container">
    <gallery-image :images="images" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GalleryImage from '~/components/GalleryImage.vue';

export default {
  name: 'Gallery',
  components: {
    GalleryImage,
  },
  computed: {
    ...mapState(['images']),
  },
};
</script>

<style scoped>
  .gallery-container {
    margin: 50px auto 12px;
    max-width: 960px;
    align-items: center;
  }
</style>
