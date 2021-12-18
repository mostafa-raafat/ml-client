import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FIREBASE_API } from '../config';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_API);
}

export default firebase;
