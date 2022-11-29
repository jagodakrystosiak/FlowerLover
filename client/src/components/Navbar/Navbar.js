import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import useRefreshToken from "../../hooks/useRefreshToken";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const { auth, logout } = useContext(AppContext);
    const [showMenuTablet, setShowMenuTablet] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    return (
        <>
            <div className="navbar">
                <div className="container">
                    <nav>
                        <h1 className="navbar__logo"><Link to="/">Logo strony</Link></h1>
                        <ul className="navbar__nav">
                            <li><Link to='/articles'>Porady</Link></li>
                            <li><Link to="/posts">Forum</Link></li>
                            <li><Link to='/plants'>Rośliny</Link></li>
                        </ul>
                        <div className="navbar__search"><Searchbar></Searchbar></div>
                        <ul className="navbar__user">
                            {auth ?
                                <>
                                    <ul className="navbar__nav">
                                        <li><Link to='/articles'>Moje rośliny</Link></li></ul>
                                    <li><div className="navbar__user-dropdown">
                                        <Button onClick={() => setShowDropDownMenu(!showDropDownMenu)}>{auth?.username} <i className="fa-solid fa-caret-down"></i></Button>
                                        <ul id="dropdownMenu" className={showDropDownMenu ? "display-block" : "display-none"}>
                                            <li>Profil</li>
                                            {auth?.roles.includes("ROLE_ADMIN") ? <>
                                                <li><a href="/records">Rekordy</a></li>
                                                <li><a href="/records/add">Dodaj rekordy</a></li>
                                                <li><a href="/users">Użytkownicy</a></li>
                                            </> : ""}
                                            <li><Button className="btn--dark" onClick={() => logout()}>Wyloguj się</Button></li>
                                        </ul>
                                    </div></li>
                                </>
                                :
                                <><li><Button onClick={() => navigate('/login')} className="btn--light">Zaloguj się</Button></li>
                                    <li><Button onClick={() => navigate('/register')} className="btn--darker">Zarejestruj się</Button></li></>
                            }
                        </ul>
                        <div className="navbar--tablet">
                            <button onClick={() => setShowMenuTablet(!showMenuTablet)}><i className="fa-solid fa-bars"></i></button>
                            <ul id="navTablet" className={showMenuTablet ? "display-block" : "display-none"}>
                                <li><Link to='/articles'>Porady</Link></li>
                                <li><Link to="/posts">Forum</Link></li>
                                <li><Link to='/plants'>Rośliny</Link></li>
                                <li><Button onClick={() => navigate('/login')} className="btn--lighter">Zaloguj się</Button></li>
                                <li><Button onClick={() => navigate('/register')} className="btn--dark">Zarejestruj się</Button></li>
                            </ul>
                        </div>
                        <div className="navbar--mobile">
                            <button onClick={() => setShowMenuMobile(!showMenuMobile)}><i className="fa-solid fa-bars"></i></button>
                            <ul id="navMoblie" className={showMenuMobile ? "display-block" : "display-none"}>
                                <Searchbar></Searchbar>
                                <li><Link to='/articles'>Porady</Link></li>
                                <li><Link to="/posts">Forum</Link></li>
                                <li><Link to='/plants'>Rośliny</Link></li>
                                <li><Button onClick={() => navigate('/login')} className="btn--lighter">Zaloguj się</Button></li>
                                <li><Button onClick={() => navigate('/register')} className="btn--dark">Zarejestruj się</Button></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="mt-67"></div>
        </>
    );
}

export default Navbar;