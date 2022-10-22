import React, { useEffect, useState } from "react";
import './Jumbotron.scss';
import Card from './../Card/Card';
import Carousel from './../Carousel/Carousel';

function Jumbotron({ articles, articlesLenght }) {

    const carouselArticles = articles.slice(0, articlesLenght-6);
    const cardsArticles = articles.slice(articlesLenght-6, articlesLenght);

    return (
        <div className="jumbotron">
            <div className="jumbotron__carousel">
                <Carousel articles={carouselArticles}/>
            </div>
            <div className="jumbotron__articles">
                {cardsArticles.map((article) => {
                    return <a href={"/" + 1}><Card title={article.title}>{article.content}</Card></a>
                })}
            </div>
        </div>
    );
}

export default Jumbotron;