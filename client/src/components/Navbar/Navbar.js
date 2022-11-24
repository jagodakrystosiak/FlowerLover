import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenuTablet, setShowMenuTablet] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);

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
                    <p className="navbar__search"><Searchbar></Searchbar></p>
                    <ul className="navbar__user">
                        <li><Button onClick={() => navigate('/login')} className="btn--light">Zaloguj się</Button></li>
                        <li><Button onClick={() => navigate('/register')} className="btn--darker">Zarejestruj się</Button></li>
                    </ul>
                    <div className="navbar--tablet">
                        <button onClick={() => setShowMenuTablet(!showMenuTablet)}><i class="fa-solid fa-bars"></i></button>
                        <ul id="navTablet" className={showMenuTablet ? "display-block" : "display-none"}>
                            <li><Link to='/articles'>Porady</Link></li>
                            <li><Link to="/posts">Forum</Link></li>
                            <li><Link to='/plants'>Rośliny</Link></li>
                            <li><Button onClick={() => navigate('/login')} className="btn--lighter">Zaloguj się</Button></li>
                            <li><Button onClick={() => navigate('/register')} className="btn--dark">Zarejestruj się</Button></li>
                        </ul>
                    </div>
                    <div className="navbar--mobile">
                        <button onClick={() => setShowMenuMobile(!showMenuMobile)}><i class="fa-solid fa-bars"></i></button>
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