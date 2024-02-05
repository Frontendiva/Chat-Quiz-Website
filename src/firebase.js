// firebase.js
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    getRedirectResult, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword // Импортируйте эту функцию
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJmHb8g4EG7sO1nx6RXhhIkDKm9PS978o",
  authDomain: "chat-quiz-website-47d6f.firebaseapp.com",
  projectId: "chat-quiz-website-47d6f",
  storageBucket: "chat-quiz-website-47d6f.appspot.com",
  messagingSenderId: "939253737946",
  appId: "1:939253737946:web:965231c99b3837123078e3",
  measurementId: "G-N8KRCGGRZ4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app); 

export { 
  auth, 
  provider, 
  firestore,
  signInWithPopup, 
  getRedirectResult, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
};