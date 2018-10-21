import firebase from 'firebase';
import firebaseConfig from '../../../environment/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });