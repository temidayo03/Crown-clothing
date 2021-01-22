import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDnGZiwb31gMj0mF-ewWLHA7qr_3Pq7UR8",
    authDomain: "crwn-db-e6b7d.firebaseapp.com",
    projectId: "crwn-db-e6b7d",
    storageBucket: "crwn-db-e6b7d.appspot.com",
    messagingSenderId: "995670393067",
    appId: "1:995670393067:web:a8b5fc69bb22ed555a3eae",
    measurementId: "G-NV24D4ZY4G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uId}`);
    const snapShot  = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                createdAt,
                email,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters = ({ prompt: 'select_Account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;