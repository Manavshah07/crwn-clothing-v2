import {React, Fragment, useContext} from "react";
import { Outlet, Link } from 'react-router-dom';
// import { Fragment } from "react/cjs/react.production.min";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser  } = useContext(UserContext);

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">shop</Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>sign out</span>
                        ) : (
                            <Link className="nav-link" to="/auth">sign in</Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;