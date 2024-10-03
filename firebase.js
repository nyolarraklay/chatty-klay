// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtNfKgMTPkNyvybelc5cLcVQ2AyNtaNO8",
  authDomain: "chat-with-arra.firebaseapp.com",
  projectId: "chat-with-arra",
  storageBucket: "chat-with-arra.appspot.com",
  messagingSenderId: "1065415363001",
  appId: "1:1065415363001:web:ac4faca42e60da55bace68",
};

// Initialize Firebase
const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
