import { async } from "@firebase/util";
import { useState, useContext } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// import { UserContext } from "../../contexts/user.context";

import "../sign-up-form/sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    // I am destructing the value as i want to use it
    const { displayName, email, password, confirmPassword} = formFields;
    console.log(formFields);

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("password does not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            // setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('email already in use');
            } else {
                console.log("user encountered an error:", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    
    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                {/* <FormInput label="Display Name" inputOptions= {{
                   type:"text", required: "true", onChange:{handleChange}, name:"displayName" ,value:{displayName} 
                }}  /> */}
                {/* Here just pass the inputoptions into the sign-up.form.component as props and then use it  */}

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
            
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;