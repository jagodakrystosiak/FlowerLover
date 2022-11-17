import React, { useEffect, useState } from "react";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
import Pagination from '../../components/Pagination/Pagination';
import Searchbar from "../../components/Searchbar/Searchbar";
import Button from "../../components/Button/Button";
import './../Posts/Posts.scss';
import ArticleList from "../../components/ArticleList/ArticleList";
import HttpClient from "../../services/HttpClient";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false); // do implementacji
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(12);
    const [sortType, setSortType] = useState("");
    const [wordToFind, setWordToFind] = useState("");

    useEffect(() => {
        getArticles();
        getCategories();
    }, [sortType, wordToFind]);

    const getArticles = async () => {
        const { data } = await HttpClient().get('http://localhost:8080/articles/all');
        console.log({ data });
        let articles = data;
        //Przykład do testowania
        /*for (let i = 0; i < 100; i++) {
            articles[i] = {
                id: i + 1,
                title: "Artykuł nr" + (i + 1),
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.",
                date: new Date(2000 + i / 10, 9, 22, 18, 10, 13),
                img: "https://source.unsplash.com/random/1000x500?sig=" + i
            };
        };*/
        if (wordToFind != "") {
            let filteredArticles = [];
            let i = 0;
            articles.forEach((article) => {
                if (article.title.includes(wordToFind) || article.content.includes(wordToFind)) {
                    filteredArticles[i] = article;
                    i++;
                }
            });
            articles = filteredArticles;
        }
        setArticles(articles.sort(sortArticles));
    }

    const getCategories = () => {
        let categories = [];
        for (let i = 0; i < 50; i++) {
            categories[i] = {
                id: i + 1,
                name: "Kategoria" + i
            };
        };
        setCategories(categories);
    }

    const sortArticles = (a, b) => {
        switch (sortType) {
            case 'title':
                if (a.title > b.title) return 1;
                else return -1;
                break;
            case 'newest':
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
                break;
            case 'oldest':
                if (a.createDate.valueOf() > b.createDate.valueOf()) return 1;
                else return -1;
                break;
            default:
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
                break;

        }
    }

    const handleArticlePerPageChange = (event) => setArticlesPerPage(event.target.value);
    const handleSortArticles = (event) => setSortType(event.target.value);
    const handleSearchArticles = (event) => setWordToFind(event.target.value);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);


    return (
        <div className="container content">
            <div className="content__categories">
                <h1>Kategorie</h1>
                <ul>
                    {categories.map((category, index) => <li>
                        <a href={"/category/" + category.id}>
                            <Button className={index % 2 == 1 ? "btn--dark" : "btn--lighter"}>{category.name}</Button>
                        </a>
                    </li>)}
                </ul>
            </div>
            <div className="content__list">
                <h1>Artykuły</h1>
                <div className="content__filter">
                    <Searchbar onChange={(event) => handleSearchArticles(event)} />
                    <p>Sortuj
                        <select className="content__select" onChange={(event) => handleSortArticles(event)}>
                            <option value="newest">Najnowsze</option>
                            <option value="oldest">Najstarsze</option>
                            <option value="title">Tytuły</option>
                        </select>
                    </p>
                    <p>Pokaż
                        <select className="content__select" onChange={(event) => handleArticlePerPageChange(event)}>
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="48">48</option>
                        </select>
                    </p>
                </div>
                <ArticleList articles={currentArticles} />
                <Pagination postsPerPage={articlesPerPage} totalPosts={articles.length} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    )
}

export default Articles;