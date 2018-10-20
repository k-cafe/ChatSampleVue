import Vue from 'vue'
import Vuex from 'vue'

import UserModule from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: UserModule,
  },
});
