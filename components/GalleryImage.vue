<template>
  <div>
    <div class="gallery-title">
      Gallery
    </div>
    <ul>
      <li v-for="image in images" :key="JSON.stringify(image)">
        <img v-lazy="image" :alt="image">
      </li>
    </ul>
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
  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    padding: 3px;
    height: 40vh;
    flex-grow: 1;
  }

  li:last-child {
    flex-grow: 10;
  }

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }

  @media (max-aspect-ratio: 1/1) {
    li {
      height: 30vh;
    }
  }
  @media (max-height: 480px) {
    li {
      height: 80vh;
    }
  }


  @media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    ul {
      flex-direction: row;
    }

    li {
      height: auto;
      width: 100%;
    }
    img {
      width: 100%;
      max-height: 75vh;
      min-width: 0;
    }
  }
  .images-container {
    display: grid;
    gap: 15px;
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
