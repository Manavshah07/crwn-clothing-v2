
import { initializeApp } from 'firebase/app'; // This is used for Initialize the firebase in our app so that we can perform CRUD operation
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged // This is an observer listener then listens the hooks events 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, // it allows us to retrieve the documents inside our firestore database
    getDoc, // it allows us to get the data from documents 
    setDoc // it allows us to set the data from documents
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsrFOpWZpVPo1_zKbVrynfPmeao_YEgEc",
    authDomain: "crwn-clothing-db-c1234.firebaseapp.com",
    projectId: "crwn-clothing-db-c1234",
    storageBucket: "crwn-clothing-db-c1234.appspot.com",
    messagingSenderId: "344691657666",
    appId: "1:344691657666:web:487248c394c4671dd1e45b"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// Here when someone comes in our app he interact with provider and always he select the google account
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

// Here we are getting data from auth Service and we will set that data to our db
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid ) // (database, 'collection_name', Unique_id in collection)
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exists());

    // CREATING USER
    if(!userSnapshot.exists()) {
    
        // if user data does not exist 
        // create / set the document with the data from userAuth in my collection

        const { displayName, email } = userAuth; 
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });

        } catch (error) {
            console.log('error creating the user', error.message);
        }

    }

    // if user data exists
    // return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>  {

    if(!email || !password) 
        return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>  {

    if(!email || !password) 
        return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback,); 
// First is auth state and second is callback that you want to calll when everytime auth state changes

// This all state occurs when the auth state changes 
/**
 * next: callback,
 * error: errorCallback,
 * complete: completeCallback
 */

