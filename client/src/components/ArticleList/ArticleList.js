import React from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import './ArticleList.scss';

const ArticleList = ({ articles, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="articlelist">
            {articles.map((article) => 
            <ArticleBox article={article} />)}
        </div>
    )
}

export default ArticleList;