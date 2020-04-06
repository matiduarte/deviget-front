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
    read: false,
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
    markAsRead(localState, data) {
      const postIndex = localState.tops.findIndex((t) => t.created === data.created);
      Vue.set(localState.tops, postIndex, { ...data, read: true });
    },
    deletePost(localState, data) {
      const postIndex = localState.tops.findIndex((t) => t.created === data.created);
      const { selectedPost } = localState;
      // If the post is select, it has to be removed
      if (selectedPost && (selectedPost.created === data.created)) {
        Vue.set(localState, 'selectedPost', null);
      }
      Vue.delete(localState.tops, postIndex);
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
    markAsRead({ commit }, data) {
      commit('markAsRead', data);
    },
    deletePost({ commit }, data) {
      commit('deletePost', data);
    },
  },
};

export default storeCreate;
