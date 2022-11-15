import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import './ShowArticle.scss';

const ShowArticle = () => {
    const [article, setArticle] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = () => {
        setArticle({
            id: 1,
            title: "Fairy Garden - jak zrobić baśniowy ogród dla wróżek?",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.",
            create_date: new Date(2022, 9, 22, 18, 10, 13),
            img: "https://source.unsplash.com/random/1000x500?sig=1"
        });
        getUser();
    }

    const getUser = () => {
        setUser({
            id: 1,
            username: "roslinki123"
        });
    }

    const createDate = (object) => {
        let date = "";
        if (object != null && object.create_date != null) {
            date = object.create_date.getDate() + "."
                + object.create_date.getMonth() + "."
                + object.create_date.getFullYear() + "\t"
                + object.create_date.getHours() + ":"
                + object.create_date.getMinutes();
        }
        return date;
    }

    return (
        <div className="container">
            {article!=null&&user!=null ?
                <div className="article">
                    <div className="article__categories">
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                    </div>
                    <div className="article__box">
                        <p><a href="">{user.username}</a> | {createDate(article)}</p>
                        <h1 className="article__title">{article.title}</h1>
                    </div>
                    <img src={article.img}></img>
                    <div className="article__box">
                        <p className="article__content">{article.content}</p>
                    </div>
                </div>
                : <h1>Loading ...</h1>}

        </div>
    )
}

export default ShowArticle;