// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDovf779ojKEgG3MxDeJHNwdN9u1l5CbBQ",
  authDomain: "cs147-quokkatips.firebaseapp.com",
  projectId: "cs147-quokkatips",
  storageBucket: "cs147-quokkatips.appspot.com",
  messagingSenderId: "85473712795",
  appId: "1:85473712795:web:490ad0582cb91059f7043e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; //so other files can access