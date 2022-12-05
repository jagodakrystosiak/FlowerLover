import React from "react";
import './Footer.scss';

//Wszelkie przekierowania w stópce

function Footer () {
    return(
        <footer>
            <div className="container">
                <div className="footer">
                    <div className="footer__section">
                        <h3>Porady</h3>
                        <ul>
                            <li><a href="/">Strona główna</a></li>
                            <li><a href="/articles">Artykuły</a></li>
                            <li><a href="/">Pielęgnacja</a></li>
                            <li><a href="/">Architektura</a></li>
                            <li><a href="/">Aranżacja</a></li>
                            <li><a href="/">Rośliny doniczkowe</a></li>
                            <li><a href="/">Rośliny na balkon</a></li>
                            <li><a href="/">Domowy zielnik</a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Forum</h3>
                        <ul>
                            <li><a href="/posts">Posty</a></li>
                            <li><a href="/">Tematy na czasie</a></li>
                            <li><a href="/">Pielęgnacja</a></li>
                            <li><a href="/">Architektura</a></li>
                            <li><a href="/">Katalog roślin</a></li>
                            <li><a href="/">Kalendarz</a></li>
                            <li><a href="/">Lista tagów</a></li>
                            <li><a href="/">Kontakt</a></li>
                            <li><a href="/">Forum ogrodnicze </a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Rośliny</h3>
                        <ul>
                            <li><a href="/plants">Katalog roślin</a></li>
                            <li><a href="/">Wyszukiwanie roślin</a></li>
                            <li><a href="/">Rośliny zielone</a></li>
                            <li><a href="/">Rośliny z kwiatostanem</a></li>
                            <li><a href="/">Sukulenty i półsukulenty</a></li>
                            <li><a href="/">Łatwe w hodowli</a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Profil</h3>
                        <ul>
                            <li><a href="/profile">Profil użytkownika</a></li>
                            <li><a href="/">Moje rośliny</a></li>
                            <li><a href="/">Kalendarz podlewania</a></li>
                            <li><a href="/">Ustawienia konta</a></li>
                            <li><a href="/">Dodawanie rośliny</a></li>
                            <li><a href="/">Regulamin strony</a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Kontakt</h3>
                        <ul>
                            <li>Email kontaktowy</li>
                            <li>kontakt@nasza_strona.pl</li>
                        </ul>
                    </div>
                    <div className="footer__copyright">
                        <h3>Logo strony</h3>
                        <p>Copyright &copy; 2022 - 2023 by Grupa nasza-strona.pl</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;