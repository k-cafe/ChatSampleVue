import { CommentRepository } from '../../repositories';
import types from './mutation-types/comment';

export default {
  namespaced: true,
  watchAll: null,
  state:  {
    data: [],
    commentRepository:  new CommentRepository()
  },
  getters: {
    comments: (state) => state.data
  },
  mutations: {
    [types.INIT] (state, comment) {
      state.data = comment;
    },
    [types.ADD] (state, comment) {
      state.data.push(comment);
    },
    [types.UPDATE] (state, comment) {
      const index = state.data.findIndex(comment => comment.id === comment.id);
      if (index !== -1) {
        state.data[index] = comment;
        // List内のオブジェクトの修正は変更検知してくれないため、新たにListのポインタを上書きすることで強制的にVueにデータの反映をさせている
        state.data = Object.assign([], state.data);
      }
    },
    [types.DELETE] (state, comment) {
      const index = state.data.findIndex(target => target.id === comment.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    }
  },
  actions: {
    initialized({ commit }) {
      commit(types.INIT, []);
    },
    subscribe({ commit, state }) {
      // callback function
      this.watchAll = state.commentRepository.findAll((type, comment) => {
        if (type === 'added') { commit(types.ADD, comment) }
        else if (type === 'modified') { commit(types.UPDATE, comment) }
        else if (type === 'removed') { commit(types.DELETE, comment) }
      });
    },
    unsubscribe() {
      // firebase.CollectionReference.onSnapshot()はObserverのため、
      // 削除しないとメモリリークの可能性があるため、定期的に削除(unsubscribeする)
      // また、消さない場合は２重で同じデータが取得されてしまう可能性も
      if (this.watchAll) {
        this.watchAll();
        this.watchAll = null;
      }
    },
    addComments({ state }, comment) {
      state.commentRepository.add(comment);
    },
    deleteComments({ state }, comment) {
      state.commentRepository.remove(comment);
    },
  }
}