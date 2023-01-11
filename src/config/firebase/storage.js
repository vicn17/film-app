import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm2VCV5TW514_ieXZm0jqJKMk1Qlg6dxA",
  authDomain: "node-app-film.firebaseapp.com",
  projectId: "node-app-film",
  storageBucket: "node-app-film.appspot.com",
  messagingSenderId: "93428371580",
  appId: "1:93428371580:web:f716aa1a1c94c31c5b39f9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
