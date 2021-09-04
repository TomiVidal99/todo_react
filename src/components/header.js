const Header = () => {
    return(
        <header className="header w-100 row">
            <nav className="nav w-100 row jc-sb">
                <ul className="nav__list nav__logo">
                    <li className="nav__item row w-100 row jc-c">
                        <img src="logo-nav.png" alt="Logo"/>
                    </li>
                </ul>
                <ul className="nav__list nav__links">
                    <li className="nav__item row w-100 row jc-c"><a href="#home">Home</a></li>
                    <li className="nav__item row w-100 row jc-c"><a href="#list">List</a></li>
                </ul>
                <ul className="nav__list nav__auth">
                    <li className="nav__item row w-100 row jc-c auth__logo"><a href="#/"><img src="./../logo.svg" alt="user logo"/></a></li>
                    <li className="nav__item row w-100 row jc-c auth__login"><a href="#/">Login</a></li>
                    <li className="nav__item row w-100 row jc-c auth__register"><a href="#/">Register</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
