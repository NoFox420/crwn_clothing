// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//doc= getting document from database
//getDoc= getting data inside document
//setDoc= writing data inside document
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHvbxei5jrPF-zA3rZ-W4WkiZFFq4yB1w",
  authDomain: "crwn-clothing-db-54dc6.firebaseapp.com",
  projectId: "crwn-clothing-db-54dc6",
  storageBucket: "crwn-clothing-db-54dc6.appspot.com",
  messagingSenderId: "620387593372",
  appId: "1:620387593372:web:bdf060e5c9ed2530919159",
};

// Initialize Firebase and passing the config to initializeApp function
const firebaseApp = initializeApp(firebaseConfig);

// Initializing a new provider instant
const googleProvider = new GoogleAuthProvider();

// how provider will behave
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//
export const auth = getAuth();
//
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
//
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//instanciating a database
export const db = getFirestore();

//taking data from auth service and storing it in firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  //passing in values if not provided by authenticator
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //check if existing document reference exists
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  //get data related to userDocRef
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  //check if reference exists in database
  console.log(userSnapshot.exists());

  //what to do if data doesn't exist
  if (!userSnapshot.exists()) {
    //get data from user object
    const { displayName, email } = userAuth;
    //get time when signed in
    const createdAt = new Date();

    //set data to user document passing it the user reference
    try {
      //set doc with object
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        //spreading object in after previous values have been filled, if null: overwrite
        ...additionalInformation,
      });
    } catch (error) {
      //log message if error occurs
      console.log("error creating user", error.message);
    }
  }
  //what to do if userSnapshot already exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
