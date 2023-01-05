import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import './ShowArticle.scss';
import ArticleBox from "./../../../components/ArticleBox/ArticleBox";
import { useParams } from "react-router-dom";
import useFetchers from "../../../hooks/useFetchers";
import dateConverter from "../../../helpers/dateConverter";

const ShowArticle = () => {
    const { id } = useParams();
    const { fetchArticleById, fetchCategoryById } = useFetchers();
    const [article, setArticle] = useState(null);
    const [categories, setCategories] = useState(null);
    const [similarArticles, setSimilarArticles] = useState([]);

    useEffect(() => {
        getArticle();
    }, [id]);

    useEffect(()=>{
        getCategories();
        getSimilarArticles();
    },[article])

    const getArticle = async () => {
        const data = await fetchArticleById(id);
        console.log(data);
        setArticle(data);
    }

    const getCategories = async () => {
        let categories = [];
        for(let categoryId of article.categoriesIds){
            const data = await fetchCategoryById(categoryId);
            categories.push(data);
        }
        setCategories(categories);
    }

    const getSimilarArticles = async() => {
        let silimar = [];
        for(let i=1; i<4; i++){
            if(id-i>0){
                const data = await fetchArticleById(id-i);
                silimar.push(data);
            }
        }
        setSimilarArticles(silimar);
    }

    return (
        <div className="container article__container">
            {article ?
                <div className="article">
                    <div className="article__categories">
                        {categories ? categories.map((category) => <Button className="btn--light btn--small">{category.name}</Button>) : ""}
                    </div>
                    <div className="article__box">
                        <p><span className="article__author">{article.username}</span> | {dateConverter(article.createDate)}</p>
                        <h1 className="article__title">{article.title}</h1>
                    </div>
                    {article.url ? <img src={article.url} alt=""></img> : ""}
                    <div className="article__box">
                        <p className="article__content">{article.content}</p>
                    </div>
                </div>
                : <h1>Loading ...</h1>}
                {similarArticles ?
                    <div className="article__similar">
                        {similarArticles.map((article) => <ArticleBox article={article} />)}
                    </div>
                    : <h2>No similar find</h2>}
        </div>
    )
}

export default ShowArticle;

