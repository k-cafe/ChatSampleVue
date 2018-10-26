import { firebaseMutations, firebaseAction } from 'vuexfire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { config } from '../../environment/firebaseConfig';

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
const commentsRef = db.collection('comments');

const INIT_COMMENT = 'INIT_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DESTROY_COMMENT = 'DESTORY_COMMENT';

export default {
  namespaced: true,
  state: {
    comments: [],
  },
  mutations: {
    ...firebaseMutations,
  },
  actions: {
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
    getComments: state => state.todos,
  },
}
