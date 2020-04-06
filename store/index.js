import Vue from 'vue';
import request from '../utils/ajax.js';
import fixGifExtension from '../utils/imageUtil';

const mapDataToTops = (data) => {
  return data.map(({
    data: {
      title,
      author,
      created,
      num_comments: comments,
      thumbnail,
      url,
    },
  }) => ({
    title,
    author,
    comments,
    created,
    thumbnail,
    image: fixGifExtension(url),
    hasImage: url.match(/[^/]+(jpg|jpeg|png|gif|gifv)$/),
  }));
};

const storeCreate = {
  state() {
    return {
      tops: [],
      next: null,
      selectedPost: null,
      images: [], // Saved images from user
    };
  },

  mutations: {
    setNextPage(localState, data) {
      Vue.set(localState, 'next', data);
    },
    setSelectedPost(localState, data) {
      Vue.set(localState, 'selectedPost', data);
    },
    addPosts(localState, data) {
      const tops = [...localState.tops, ...data];
      Vue.set(localState, 'tops', tops);
    },
    saveImage(localState, data) {
      const images = [...localState.images, data];
      Vue.set(localState, 'images', images);
    },
  },

  actions: {
    async loadPosts({ commit, state: localState }) {
      try {
        const { next } = localState;
        const pagination = next ? `&after=${next}` : '';
        const {
          data: {
            data: { children, after },
          },
        } = await request('GET', `top.json?limit=10${pagination}`);
        const tops = mapDataToTops(children);
        commit('addPosts', tops);
        commit('setNextPage', after);
      } catch (error) {
        console.error(error);
      }
    },
    setSelectedPost({ commit }, data) {
      commit('setSelectedPost', data);
    },
    saveImages({ commit }, data) {
      commit('saveImage', data);
    },
  },
};

export default storeCreate;
