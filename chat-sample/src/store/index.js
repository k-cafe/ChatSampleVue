import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import comments from './modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
    comments: comments,
  },
});
