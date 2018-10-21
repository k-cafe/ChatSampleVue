import { User } from '../../models';

export default {
  namespaced: true,
  state: {
    user: new User('user0001', 'Tanaka Taro'),
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    register (state, user) {
      state.user = user;
    },
  },
};
