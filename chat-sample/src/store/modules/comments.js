import { getAll, add, remove } from '../../repositories/comment-repository'

export default {
  namespaced: true,
  findAll: null,
  state:  {
    data: [],
  },
  mutations: {
    init (state, payload) {
      state.data = payload
    },
    add (state, payload) {
      state.data.push(payload)
    },
    set (state, payload) {
      const index = state.data.findIndex(comment => comment.id === comment.id)
      if (index !== -1) {
        state.data[index] = payload
        // List内のオブジェクトの修正は変更検知してくれないため、新たにListのポインタを上書きすることで強制的にVueにデータの反映をさせている
        state.data = Object.assign([], state.data)
      }
    },
    remove (state, payload) {
      const index = state.data.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  getters: {
    data: (state) => state.data
  },
  actions: {
    clear ({ commit }) {
      commit('init', [])
    },
    subscribe ({ commit }) {
      // getAll()を呼び出すことでfirebaseから取得したデータを一度解放する。getAll()をずっと続けているとメモリリークに繋がるので注意
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }

      // callback function
      this.findAll = getAll((type, payload) => {
        if (type === 'added') { commit('add', payload) }
        else if (type === 'modified') { commit('set', payload) }
        else if (type === 'removed') { commit('remove', payload) }
      });
    },
    unsubscribe () {
      // getAll()を呼び出すことでfirebaseから取得したデータを一度解放する。getAll()をずっと続けているとメモリリークに繋がるので注意
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }
    },
    addComments ({ commit }, payload) {
      add(payload)
    },
    deleteComments ({ commit }, payload) {
      remove(payload)
    },
  }
}