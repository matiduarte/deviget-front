<template>
  <div v-if="selectedPost">
    <div class="detail-card">
      <div class="title-card">
        {{ selectedPost.title }}
      </div>
      <div class="detail-card-img">
        <img
          id="detailImg"
          v-lazy="selectedPost.thumbnail"
          :alt="selectedPost.title"
          height="100%"
          width="100%"
          @click="showModal =! showModal"
        >
      </div>
      <div class="detail-container">
        <div class="author">
          {{ `Posted by ${selectedPost.author}` }}
        </div>
        <div class="comments">{{ `${selectedPost.comments} comments` }}</div>
      </div>
    </div>
    <modal-image :url="selectedPost.image" :visibility="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalImage from './ModalImage';

export default {
  name: 'PostDetail',
  components: {
    ModalImage,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState(['selectedPost']),
  },
};
</script>

<style scoped>
  .title-card {
    margin: 10px;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
  }

  #detailImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  #detailImg:hover {opacity: 0.7;}

  .detail-card {
    display: block;
    position: sticky;
    top: 70px;
    transition: 0.3s;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .detail-card-img {
    width: 144px;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    cursor: pointer;
  }
  .detail-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
  }
  .author {
    font-weight: 500;
    font-size: 14px;
  }
  .comments {
    font-size: 16px;
    font-weight: bold;
    color: #447ac4;
    margin-top: auto;
    margin-bottom: 10px;
  }
</style>
