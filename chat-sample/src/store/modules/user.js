import { User } from '../../models';

export default {
  namespaced: true,
  state: {
    user: new User(),
  },
  getters: {
    user: state => {
      return state.user;
    },
  },
  mutations: {
    register (state, user) {
      state.user = user;
    },
  },
};
