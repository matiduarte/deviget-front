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
    addPosts(localState, data) {
      const tops = [...localState.tops, ...data];
      Vue.set(localState, 'tops', tops);
    },
  },

  actions: {
    async getTopPosts({ commit }) {
      try {
        const {
          data: {
            data: { children, after },
          },
        } = await request('GET', 'top.json?limit=10');
        const tops = mapDataToTops(children);
        commit('setTopPost', tops);
        commit('setNextPage', after);
      } catch (error) {
        console.error(error);
      }
    },
    async loadPosts({ commit, state: localState }) {
      try {
        const { next } = localState;
        console.log(localState);
        const {
          data: {
            data: { children, after },
          },
        } = await request('GET', `top.json?limit=10&after=${next}`);
        const tops = mapDataToTops(children);
        commit('addPosts', tops);
        commit('setNextPage', after);
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default storeCreate;
