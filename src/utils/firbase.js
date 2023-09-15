// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/ysetup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiB_52TdanN33I02JLPbedAtPSjWyWPzU",
  authDomain: "netflixgpt-f28f0.firebaseapp.com",
  projectId: "netflixgpt-f28f0",
  storageBucket: "netflixgpt-f28f0.appspot.com",
  messagingSenderId: "288911774144",
  appId: "1:288911774144:web:940503ae0091e07b86b825",
  measurementId: "G-C2DLL17BYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
