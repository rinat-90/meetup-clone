import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

let config = {
  apiKey: 'AIzaSyBviu2I1qM_Ld67v5PGz4-pW8rclxPZtB8',
  authDomain: 'meetup-3ae34.firebaseapp.com',
  databaseURL: 'https://meetup-3ae34.firebaseio.com',
  projectId: 'meetup-3ae34',
  storageBucket: 'meetup-3ae34.appspot.com',
  messagingSenderId: '774475716159',
  appId: '1:774475716159:web:15763679e3ea0335'
};


!firebase.apps.length ? firebase.initializeApp(config) : '';
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
export default firebase
