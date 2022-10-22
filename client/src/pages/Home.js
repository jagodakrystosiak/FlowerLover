import React, { useEffect, useState } from "react";
import './../sass/style.scss';
import './Home.scss';
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Button from "../components/Button/Button";

function Home() {

    return (
        <>
            <Jumbotron />
            <div className="container home">
                <div className="home__posts">
                    <h1>Najnowsze wpisy</h1>
                    <ul>
                        <li>wpis 1</li>
                        <li>wpis 2</li>
                        <li>wpis 3</li>
                        <li>wpis 4</li>
                        <li>wpis 5</li>
                    </ul>
                </div>
                <div className="home__categories">
                    <h1>Najpopularniejsze kategorie</h1>
                    <ul>
                        <li><a href="/">Kategoria</a></li>
                        <li><a href="/">Kategoria</a></li>
                        <li><a href="/">Kategoria</a></li>
                        <li><a href="/">Kategoria</a></li>
                    </ul>
                </div>
                <div className="home__tags">
                    <h1>Najpopularniejsze tagi</h1>
                    <ul>
                        <li><Button className="btn btn--dark">kategoia 1</Button></li>
                        <li><Button className="btn btn--dark">kategoia 2</Button></li>
                        <li><Button className="btn btn--dark">kategoia 3</Button></li>
                        <li><Button className="btn btn--dark">kategoia 4</Button></li>
                        <li><Button className="btn btn--dark">kategoia 5</Button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home;