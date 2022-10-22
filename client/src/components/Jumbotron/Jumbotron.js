import React, { useEffect, useState } from "react";
import './Jumbotron.scss';
import Card from './../Card/Card';
import Carousel from './../Carousel/Carousel';

function Jumbotron() {
    const [content, setContentState] = useState([]);

    useEffect(() => {
        setCards();
    }, []);

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

    const setCards = () => {
        let content = [];
        let random = Math.floor(Math.random() * 6);

        for (let i = 0; i < 6; i++) {
            if (i == random) {
                content.push(<a href="/"><img className="fade-long" src="https://source.unsplash.com/random/300x300?sig=1"></img></a>);
            } else {
                content.push(<a href={"/" + article[i].id}><Card title={article[i].title}>{article[i].content}</Card></a>);
            }
        }

        setContentState(content);
    }

    const getCards = () => {
        return content;
    }

    return (
        <div className="jumbotron">
            <div className="jumbotron__carousel"><Carousel /></div>
            <div className="jumbotron__articles">
                {getCards()}
            </div>
        </div>
    );
}

export default Jumbotron;