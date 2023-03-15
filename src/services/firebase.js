// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvaBriq5rgO4LakRCalD9hBMw-nUmP1VU",
  authDomain: "my-to-do-app-ae320.firebaseapp.com",
  databaseURL: "https://my-to-do-app-ae320-default-rtdb.firebaseio.com",
  projectId: "my-to-do-app-ae320",
  storageBucket: "my-to-do-app-ae320.appspot.com",
  messagingSenderId: "487071638197",
  appId: "1:487071638197:web:186e3df096d8718e56d4fc",
  measurementId: "G-JYKDY6D3N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//Sign Up
const signUp = ( {email, password}) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    const userRef = await setDoc(doc(db, "users", `${user.uid}`), {email});
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error);
  });
}

//Sign In
const signIn = ({email, password}) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(error);
  });
}

//Log out
const logOut = () => {
  signOut(auth);
  console.log("Log Out");
};


export {signUp, signIn, logOut, auth, db, storage};