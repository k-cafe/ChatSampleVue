import { firebaseMutations, firebaseAction } from 'vuexfire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { config } from '../../environment/firebaseConfig';
import { Comment } from '../../models';

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
const commentsRef = db.collection('comments');

const INIT_COMMENT = 'INIT_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DESTROY_COMMENT = 'DESTORY_COMMENT';

export default {
  namespaced: true,
  unsubscribe: null,
  state: {
    comments: [],
  },
  mutations: {
    ...firebaseMutations,
    init(state, payload) {
      state.comments = payload;
    },
    add(state, payload) {
      state.comments.push(payload);
    },
    set(state, payload) {
      const index = state.comments.findIndex(comment => comment.id === payload.id);
      if (index !== -1) {
        state.comments[index] = payload;
      }
    },
    remove(state, payload) {
      const index = state.comments.findIndex(comment => comment.id === payload.id);
      if (index !== -1) {
        state.comments.splice(index, 1);
      }
    }
  },
  actions: {
    clear ({ commit }) {
      commit('init', [])
    },
    startListener({ commit }) {
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe);
        this.unsubscribe();
        this.unsubscribe = null
      }
      this.unsubscribe = commentsRef.onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          const payload = new Comment(change.doc.id, change.doc.data().message, change.doc.data().user);
          if (change.type === 'added') {
            commit('add', payload);
          } else if (change.type === 'modified') {
            commit('set', payload);
          } else if (change.type === 'removed') {
            commit('remove', payload);
          }
        });
      },
      (error) => {
        console.error(error.name);
      });
    },
    stopListener() {
      if (this.unsubscribe) {
        console.log('listener is stopping. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    [INIT_COMMENT]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('comments', commentsRef, { wait: true });
    }),
    [ADD_COMMENT]: firebaseAction((context, comment) => {
      commentsRef.add(Object.assign({}, comment));
    }),
    [DESTROY_COMMENT]: firebaseAction(({ unbindFirebaseRef }) => {
      unbindFirebaseRef('comments', commentsRef, { wait: true });
    }),
  },
  getters: {
    comments: state => state.comments,
  },
}
