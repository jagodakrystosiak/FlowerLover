import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Carousel.scss';

function Carousel({ articles }) {
    //Index of current slide
    const [slideIndex, setSlideIndex] = useState(0);

    //Infinite loop in evry 5 min change slide
    useEffect(() => {
        const timer = setTimeout(() => {
            showSlides();
          }, 5000);
          return () => clearTimeout(timer);
    });

    // Next/previous controls
    function plusSlides(n) {
        setSlideIndex(slideIndex + n);
        if (slideIndex >= articles.length-1) { setSlideIndex(0) };
        if (slideIndex < 0) { setSlideIndex(articles.length-1) };
    }

    // Thumbnail image controls
    function currentSlide(n) {
        setSlideIndex(n);
    }

    //change index of current slide
    function showSlides() {
        setSlideIndex(slideIndex+1);
        if (slideIndex >= articles.length-1) { setSlideIndex(0) };
    }

    return (
        <div className='carousel'>
            <div className="carousel__container">

                {articles.map((article, index) => {
                    return (
                        <div className={"mySlides fade " + (index==slideIndex ? "display-block" : "display-none")}>
                            <div className="carousel__numbertext">{index+1} / {articles.length}</div>
                            <div className='carousel__img'><img src={article.img} /></div>
                            <div className="carousel__text">
                                <h2>{article.title}</h2>
                                <p>{article.content.substring(0,150)} ... </p>
                                <Button className="btn btn--light">Dowiedź się więcej</Button>
                            </div>
                        </div>
                    )
                })}

                <a className="carousel__prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="carousel__next" onClick={() => plusSlides(1)}>&#10095;</a>

                <div className='carousel__dots'>
                    {articles.map((article, index) => {
                        return <span className={'carousel__dot ' + (index==slideIndex ? "active" : "")} onClick={() => currentSlide(index)}></span>;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carousel;