import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import error from '../assets/error.png';

Vue.use(VueLazyload, {
  preLoad: 1,
  error,
  attempt: 1,
});
