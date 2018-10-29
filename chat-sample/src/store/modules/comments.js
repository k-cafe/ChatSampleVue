import { CommentRepository } from '../../repositories/comment-repository'

export default {
  namespaced: true,
  findAll: null,
  commentRepository: null,
  state:  {
    data: [],
  },
  mutations: {
    init (state, comment) {
      state.data = comment
    },
    add (state, comment) {
      state.data.push(comment)
    },
    set (state, comment) {
      const index = state.data.findIndex(comment => comment.id === comment.id)
      if (index !== -1) {
        state.data[index] = comment
        // List内のオブジェクトの修正は変更検知してくれないため、新たにListのポインタを上書きすることで強制的にVueにデータの反映をさせている
        state.data = Object.assign([], state.data)
      }
    },
    remove (state, comment) {
      const index = state.data.findIndex(target => target.id === comment.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  getters: {
    comments: (state) => state.data
  },
  actions: {
    initialized({ commit }) {
      commit('init', [])
    },
    subscribe({ commit }) {
      // getAll()を呼び出すことでfirebaseから取得したデータを一度解放する。
      // 解放しなかった場合、次にこれを呼ぶと２重で同じデータが取得されてしまう
      // また、メモリリークの可能性が増えるので削除をする
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }

      this.commentRepository =  new CommentRepository();

      // callback function
      this.findAll = this.commentRepository.findAll((type, comment) => {
        if (type === 'added') { commit('add', comment) }
        else if (type === 'modified') { commit('set', comment) }
        else if (type === 'removed') { commit('remove', comment) }
      });
    },
    unsubscribe() {
      // 同上
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }
    },
    addComments({ commit }, comment) {
      this.commentRepository.add(comment)
    },
    deleteComments({ commit }, comment) {
      this.commentRepository.remove(comment)
    },
  }
}