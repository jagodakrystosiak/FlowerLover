import React, { useEffect } from "react";
import './../sass/style.scss';
import './Home.scss';
import Carousel from "../components/Carousel/Carousel";
import Card from "../components/Card/Card";

function Home() {
    useEffect(() => {
        const timer = setTimeout(() => {
            showCard();
        }, 1000);
        return () => clearTimeout(timer);
    });
    let content = [];
    let cardNum = 1;

    const article = [
        {
            id: 1,
            title: "Jak podcinać rośliny?",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 2,
            title: "Jak nawozić?",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 3,
            title: "Pomysły na aranżację balkonu",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 4,
            title: "Uprawa ziół w domu",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 5,
            title: "Ranking najlepszych nawozów",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 6,
            title: "Ranking najlepszych pomysłów na rośliny",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 7,
            title: "a",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 8,
            title: "b",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 9,
            title: "c",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 10,
            title: "d",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 11,
            title: "e",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        },
        {
            id: 12,
            title: "f",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione."
        }
    ]

    const setCards = (n) => {
        content = [];
        let random = Math.floor(Math.random() * 6);

        for (let i = 0; i < 6; i++) {
            if (i == random) {
                content.push(<img className="fade-long" src="https://source.unsplash.com/random/300x300?sig=1"></img>);
            } else {
                content.push(<a href={"/" + article[i + n].id}><Card title={article[i + n].title}>{article[i + n].content}</Card></a>);
            }
        }
    }

    const getCards = (n) => {
        setCards(n);
        return content;
    }

    const showCard = () => {
        var blocks = document.getElementsByClassName("main__block");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].classList.remove("display-grid");
            blocks[i].classList.add("display-none");
        }
        cardNum++;
        if (cardNum > blocks.length) { cardNum = 1 };
        blocks[cardNum-1].classList.remove("display-none");
        blocks[cardNum-1].classList.add("display-grid");
        setTimeout(showCard, 10000);
    }

    return (
        <div>
            <div className="main">
                <div className="main__carousel"><Carousel /></div>
                <div className="main__block">
                    {getCards(0)}
                </div>
                <div className="main__block display-none">
                    {getCards(6)}
                </div>
            </div>
            <div className="container test">
                <h1>Najnowsze wpisy</h1>
                <p>aaaa</p>
            </div>
        </div>
    );
}

export default Home;