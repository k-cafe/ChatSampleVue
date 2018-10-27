// import * as firebase from 'firebase/app';
import 'firebase/firestore';
import db from './database/database';
// import { Comment } from '../../models';

const commentsRef = db.collection('comments');

export default {
  namespaced: true,
  unsubscribe: null,
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
    // 1. リスナーの起動
    startListener ({ commit }) {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
      // 3. Firestoreからデータを検索する
      this.unsubscribe = commentsRef.onSnapshot(querySnapshot => {

        // 6. データが更新されるたびに呼び出される
        querySnapshot.docChanges().forEach(change => {

          const payload = {
            id: change.doc.id,
            message: change.doc.data().message,
            user: change.doc.data().user,
          }

          // 4. ミューテーションを通してステートを更新する
          if (change.type === 'added') {
            commit('add', payload)
          } else if (change.type === 'modified') {
            commit('set', payload)
          } else if (change.type === 'removed') {
            commit('remove', payload)
          }
        })
      })
    },
    stopListener () {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
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