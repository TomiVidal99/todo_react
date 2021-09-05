import React from 'react';
import {auth, handle_signin_google, handle_logout} from './authentication';
import {useAuthState} from 'react-firebase-hooks/auth';

const Header = ({logout_callback}) => {
    const [user] = useAuthState(auth);
    return(
        <header className="header w-100 row">
            <nav className="nav w-100 row">
                <ul className="nav__list nav__auth">
                    <li className="nav__item row jc-c auth__logo"><a href="#/">{user ? <img src={user._delegate.photoURL} alt="user logo"/> : ''}</a></li>
                    <li className="nav__item row jc-c auth__username">{user ? user.multiFactor.user.displayName : ''}</li>
                    {user ? <li className="nav__item row jc-c auth__button auth__logout"><button className="auth__btn btn_logout" onClick={() => {handle_logout(); logout_callback();}}>Logout</button></li> : <li className="nav__item row jc-c auth__button auth__login"><button className="auth__btn btn_login" onClick={handle_signin_google}>Login with google</button></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
