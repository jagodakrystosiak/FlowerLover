import React from "react";
import './ArticleBox.scss';

const ArticleBox = ({article}) => {
    return (
        <div className="articlebox">
            <a href={"/article/" + article.id}>
            <div className="articlebox__img">
                {article.img ? <img src={article.img} alt="Article image"></img> : <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="dummies"></img> }
            </div>
            <div className="articlebox__text">
                <h1>{article.title}</h1>
                <p>{article.content.substring(0,200)} ...</p>
            </div>
            </a>
        </div>
    )
}

export default ArticleBox;