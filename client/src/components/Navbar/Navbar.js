import React from "react";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import './Navbar.scss';

export default function () {
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
                    
                </nav>
            </div>
        </div>
    );
}
