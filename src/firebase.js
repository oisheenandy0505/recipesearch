// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAF1fkvu45Y4tjTRSOUCwZQN4kXmU-4_DU",
  authDomain: "mealplannerapp-7dd34.firebaseapp.com",
  projectId: "mealplannerapp-7dd34",
  storageBucket: "mealplannerapp-7dd34.appspot.com",
  messagingSenderId: "348183562469",
  appId: "1:348183562469:web:703b12b42fd45993e42c0c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInWithEmailAndPassword, createUserWithEmailAndPassword };
