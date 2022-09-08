import {React, Fragment, useContext} from "react";
import { Outlet, Link } from 'react-router-dom';
// import { Fragment } from "react/cjs/react.production.min";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser  } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    console.log(isCartOpen);

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
                    <CartIcon />
                </div> 
                { isCartOpen && <CartDropdown /> }
                {/* Here && is a short circuit (its first value and second value should always be true if its both value are true then it returns the last thing you gave to me) and component is always true and it checks the isCartOpen value that it returns true or false if it gives true then it returns CartDropdown and if it is false then it won't return anything */}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;