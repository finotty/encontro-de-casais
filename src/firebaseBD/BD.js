import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyDu0fglKn5aINXykQZsg7IIIfxiWxos1SY",
  authDomain: "encontro-casais.firebaseapp.com",
  projectId: "encontro-casais",
  storageBucket: "encontro-casais.appspot.com",
  messagingSenderId: "53451684606",
  appId: "1:53451684606:web:4738edf5d0d364974e83af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
