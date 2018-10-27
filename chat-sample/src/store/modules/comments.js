import db from './database/database';
import { Comment, User } from '../../models'

const commentsRef = db.collection('comments');

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
        // List内の修正は変更検知してくれないため、新たにインスタンスを作成し、修正
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
    startListener ({ commit }) {
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }

      this.findAll = commentsRef.onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const payload = new Comment(
            change.doc.id,
            change.doc.data().message,
            new User(change.doc.data().user.id, change.doc.data().user.name)
          )
          if (change.type === 'added') { commit('add', payload) }
          else if (change.type === 'modified') { commit('set', payload) } 
          else if (change.type === 'removed') { commit('remove', payload) }
        })
      })
    },
    stopListener () {
      if (this.findAll) {
        this.findAll()
        this.findAll = null
      }
    },
    addComments ({ commit }, payload) {
      commentsRef.add(Object.assign({}, payload))
    },
    deleteComments ({ commit }, payload) {
      commentsRef.doc(payload.id).delete()
    }
  }
}