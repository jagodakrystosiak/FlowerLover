import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Carousel.scss';

function Carousel() {
    useEffect(() => {
        const timer = setTimeout(() => {
            showSlides();
        }, 1000);
        return () => clearTimeout(timer);
    });
    let slideIndex = 0;

    // Next/previous controls
    function plusSlides(n) {
        showSlide(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    function showSlide(n) {

        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("carousel__dot");

        if (n > slides.length) { slideIndex = 1 }
        else if (n < 1) { slideIndex = slides.length }

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("display-block");
            slides[i].classList.add("display-none");
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].classList.remove("display-none");
        slides[slideIndex - 1].classList.add("display-block");
        dots[slideIndex - 1].className += " active";
    }

    function showSlides() {

        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("carousel__dot");

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("display-block");
            slides[i].classList.add("display-none");
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 };
        console.log(slideIndex);
        slides[slideIndex - 1].classList.remove("display-none");
        slides[slideIndex - 1].classList.add("display-block");
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 5000);
    }

    return (
        <div className='carousel'>
            <div className="carousel__container">

                <div className="mySlides fade">
                    <div className="carousel__numbertext">1 / 3</div>
                    <div className='carousel__img'><img src="https://source.unsplash.com/random/1000x500?sig=1" /></div>
                    <div className="carousel__text">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</p>
                        <Button className="btn btn--light">Dowiedź się więcej</Button>
                    </div>
                </div>

                <div className="mySlides fade display-none">
                    <div className="carousel__numbertext">2 / 3</div>
                    <div className='carousel__img'><img src="https://source.unsplash.com/random/1000x500?sig=2" /></div>
                    <div className="carousel__text">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</p>
                        <Button className="btn btn--light">Dowiedź się więcej</Button>
                    </div>
                </div>

                <div className="mySlides fade display-none">
                    <div className="carousel__numbertext">3 / 3</div>
                    <div className='carousel__img'><img src="https://source.unsplash.com/random/1000x500?sig=3" /></div>
                    <div className="carousel__text">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nemo animi delectus quam perferendis porro nobis ad adipisci cupiditate. Asperiores?</p>
                        <Button className="btn btn--light">Dowiedź się więcej</Button>
                    </div>
                </div>

                <a className="carousel__prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="carousel__next" onClick={() => plusSlides(1)}>&#10095;</a>

                <div className='carousel__dots'>
                    <span class="carousel__dot" onClick={() => currentSlide(1)}></span>
                    <span class="carousel__dot" onClick={() => currentSlide(2)}></span>
                    <span class="carousel__dot" onClick={() => currentSlide(3)}></span>
                </div>
            </div>
            <br />


        </div>
    )
}

export default Carousel;