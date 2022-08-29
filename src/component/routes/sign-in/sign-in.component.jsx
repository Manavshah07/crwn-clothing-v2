import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';

const SignIn = () => {
    // whenever you make a call to database , this is always going to be asynchronous function means it will always return you the promise.
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <>
            <div>
                <h1>Sign In Page</h1>
                <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            </div>
        </>
    )
}

export default SignIn;