import { initializeApp } from 'firebase/app'; // This is used for Initialize the firebase in our app so that we can perform CRUD operation
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

export const db = getFirestore();

// Here we are getting data from auth Service and we will set that data to our db
export const createUserDocumentFromAuth = async (userAuth) => {
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
                createdAt
            });

        } catch (error) {
            console.log('error creating the user', error.message);
        }

    }

    // if user data exists
    // return userDocRef
    return userDocRef;
}