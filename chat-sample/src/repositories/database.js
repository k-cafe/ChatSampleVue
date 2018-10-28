import firebase from 'firebase';
import { config } from '../../../environment/firebaseConfig';

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;