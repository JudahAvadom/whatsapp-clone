import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { initializeFirestore } from 'firebase/firestore'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKER } from './auth.json'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKER,
  messagingSenderId: "1080066564448",
  appId: "1:1080066564448:web:fd66e443d047b11a39be05",
  measurementId: "G-HGBLD9JJK8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true})

export function signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

export function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
}