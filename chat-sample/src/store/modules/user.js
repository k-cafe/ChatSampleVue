import { User } from '../../models';
import types from './mutation-types/user';

export default {
  namespaced: true,
  state: {
    user: new User('user0001', 'Tanaka Taro'),
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    [types.ADD] (state, user) {
      state.user = user;
    },
  },
  actions: {
    register ({ commit }, user) {
      commit(types.ADD, user);
    }
  }
};
