import React from "react";
import './ArticleBox.scss';
import Button from "../Button/Button";

//wygląd Artykułu

const ArticleBox = ({ article }) => {
    return (
        <div className="articlebox">
            <a href={"/article/" + article.id}>
                <div className="articlebox__img" style={{backgroundImage: "url(" + article.url + ")"}}>
                    {}
                </div>
                <div className="articlebox__text">
                    <h1>{article.title}</h1>
                    <p>{article.content.substring(0, 200)} ...</p>
                    <div>
                        {article.categories?.map((category, index) => index<3 ? <Button key={index} className="btn--light btn--small">{category.name}</Button> : "")}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default ArticleBox;