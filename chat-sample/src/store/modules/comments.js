export default {
  namespaced: true,
  state: {
    comments: [],
  },
  getters: {
    comments: (state) => state.comments,
  },
  mutations: {
    insertIntoComment(state, comment) {
       state.comments.push(comment);
    },
  },
  actions: {
    addComment({ commit }, comment) {
      commit('insertIntoComment', comment);
    }
  },
}
