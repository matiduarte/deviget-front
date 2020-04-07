<template>
  <div style="margin: 10px">
    <div class="gallery-title">
      Gallery
    </div>
    <div class="images-container">
      <div v-for="image in images" :key="JSON.stringify(image)">
        <img v-lazy="image" :alt="image">
      </div>
    </div>
    <div v-if="!images.length" style="text-align: center">
      No images were found
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryImage',
  props: {
    images: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
  .images-container {
    display: grid;
    gap: 20px;
    padding: 20px;
    justify-items: center;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 300px);
  }

  .gallery-title {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 8px;
  }
</style>
