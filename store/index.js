import Vue from 'vue';
import request from '../utils/ajax.js';

const mapDataToTops = (data) => {
  return data.map(({
    data: {
      title,
      author,
      created,
      num_comments: comments,
      thumbnail,
    },
  }) => ({
    title, author, comments, created, read: false, thumbnail,
  }));
};

const storeCreate = {
  state() {
    return {
      tops: [],
      next: null,
    };
  },

  mutations: {
    setTopPost(localState, data) {
      Vue.set(localState, 'tops', data);
    },
    setNextPage(localState, data) {
      Vue.set(localState, 'next', data);
    },
  },

  actions: {
    async getTopPosts({ commit }) {
      try {
        const {
          data: {
            data: { children, after: next },
          },
        } = await request('GET', 'top.json');
        const tops = mapDataToTops(children);
        commit('setTopPost', tops);
        commit('setNextPage', next);
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default storeCreate;
