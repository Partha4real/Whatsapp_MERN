import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCrqVcaakEIwIpR3hZQ9FijztaW9LeB3zg",
  authDomain: "whatsapp-mern-8162f.firebaseapp.com",
  projectId: "whatsapp-mern-8162f",
  storageBucket: "whatsapp-mern-8162f.appspot.com",
  messagingSenderId: "1089518399065",
  appId: "1:1089518399065:web:bfbd99f273a4a013400b48"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider};
export default db;