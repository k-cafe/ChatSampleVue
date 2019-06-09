import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { config } from '../environment/firebaseConfig';

const fb = firebase.initializeApp(config);
const settings = {
  timestampsInSnapshots: true
};

export const db = fb.firestore();
db.settings(settings);
export const auth = fb.auth();
