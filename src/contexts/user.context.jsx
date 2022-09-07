import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// this will be actual value that i want to access
export const UserContext = createContext({
    currentUser: null, // empty state of an object is null
    setCurrentUser: () => null, // this is a function that does nothing i.e. its an empty function 
}); // This will create a context for us

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // console.log(currentUser);
    // here i am generating the value that i am going to pass in provider
    const value = {currentUser, setCurrentUser};

    // signOutUser();

    // This will run after the componeent mounts
    useEffect(() => {
        // whenever our authStateChanges it runs our callback function 
        const unsubscribe =  onAuthStateChangedListener((user) => {
            console.log(user);
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        }) // this will stop listening the auth state 

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// here we are going wrap the app into userprovider  and then app will be our children
// <UserProvider>
//     <app />
// </UserProvider>