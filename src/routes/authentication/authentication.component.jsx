import SignUpForm from '../../component/sign-up-form/sign-up-form.component';
import SignInForm from '../../component/sign-in-form/sign-in-form.component';

import "./authentication.styles.scss";

const Authentication = () => {

    // // I want to run this when my application is mount or its rendering is over
    // useEffect( async() => {
    //     const response = await getRedirectResult(auth);
    //     // console.log(response);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);

    // // whenever you make a call to database , this is always going to be asynchronous function means it will always return you the promise.
    // const logGoogleUser = async () => {
    //     const { user } = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }

    return(
        <>
            <div className='authentication-container'>
                {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button>
                <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>  */}
                {/* signInWithGoogleRedirect internally calls the signInRedirectMethod from firebase so need to write the function for it*/}
                <SignInForm />
                <SignUpForm /> 
            </div>
        </>
    )
}

export default Authentication;