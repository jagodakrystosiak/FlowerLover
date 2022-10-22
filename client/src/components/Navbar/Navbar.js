import React, { useState } from "react";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import './Navbar.scss';

export default function () {
    const [showMenuTablet, setShowMenuTablet] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);

    return (
        <div className="navbar">
            <div className="container">
                <nav>
                    <h1 className="navbar__logo">Logo strony</h1>
                    <ul className="navbar__nav">
                        <li><a href='/article'>Porady</a></li>
                        <li><a href='/post'>Forum</a></li>
                        <li><a href='/plant'>Rośliny</a></li>
                    </ul>
                    <p className="navbar__search"><Searchbar></Searchbar></p>
                    <ul className="navbar__user">
                        <li><Button className="btn btn--light">Zaloguj się</Button></li>
                        <li><Button className="btn btn--dark">Zarejestruj się</Button></li>
                    </ul>
                    <div className="navbar--tablet">
                        <button onClick={() => setShowMenuTablet(!showMenuTablet)}><i class="fa-solid fa-bars"></i></button>
                        <ul id="navTablet" className={showMenuTablet ? "display-block" : "display-none"}>
                            <li><a href='/article'>Porady</a></li>
                            <li><a href='/post'>Forum</a></li>
                            <li><a href='/plant'>Rośliny</a></li>
                            <li><Button className="btn btn--light">Zaloguj się</Button></li>
                            <li><Button className="btn btn--dark">Zarejestruj się</Button></li>
                        </ul>
                    </div>
                    <div className="navbar--mobile">
                        <button onClick={() => setShowMenuMobile(!showMenuMobile)}><i class="fa-solid fa-bars"></i></button>
                        <ul id="navMoblie" className={showMenuMobile ? "display-block" : "display-none"}>
                            <Searchbar></Searchbar>
                            <li><a href='/article'>Porady</a></li>
                            <li><a href='/post'>Forum</a></li>
                            <li><a href='/plant'>Rośliny</a></li>
                            <li><Button className="btn btn--light">Zaloguj się</Button></li>
                            <li><Button className="btn btn--dark">Zarejestruj się</Button></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
