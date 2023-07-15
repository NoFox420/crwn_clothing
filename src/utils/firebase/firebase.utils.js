// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//doc= getting document from database
//getDoc= getting data inside document
//setDoc= writing data inside document
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

//function to add items from shop_data.js file into firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //creating a reference, pointing to the database with passed in key
  const collectionRef = collection(db, collectionKey);
  //batch allows to execute multiple actions as one
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("batch done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

//taking data from auth service and storing it in firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  //passing in values if not provided by authenticator
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //check if existing document reference exists
  const userDocRef = doc(db, "users", userAuth.uid);

  //get data related to userDocRef
  const userSnapshot = await getDoc(userDocRef);

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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//signing out user passing the user credentials to firebase
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
