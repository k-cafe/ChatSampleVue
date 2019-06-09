import types from './mutation-types/user';
import { AuthRepository } from '../../repositories';

const Authorized = {
  SUCCEEDED: true,
  FAILURED: false
};

export default {
  namespaced: true,
  state: {
    user: null,
    authRepository: new AuthRepository()
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    [types.ADD] (state, user) {
      state.user = user;
    },
    [types.INITIALIZED] (state) {
      state.user = null;
    }
  },
  actions: {
    async signInWithEmailAndPasswords({ commit, state }, { email, password }) {
      const user = await state.authRepository.signInWithEmailAndPassword(email, password);
      if (user === null) {
        return Authorized.FAILURED;
      }
      commit(types.ADD, user);
      return Authorized.SUCCEEDED;
    },
    signOut({ state }) {
      state.authRepository.signOut();
    }
  }
};
