import React, { useContext, useEffect, useState } from "react";
import Pagination from '../../components/Pagination/Pagination';
import Searchbar from "../../components/Searchbar/Searchbar";
import Button from "../../components/Button/Button";
import './../Posts/Posts.scss';
import ArticleList from "../../components/ArticleList/ArticleList";
import AppContext from "../../contexts/AppContext";
import useFetchers from "../../hooks/useFetchers";
import contentFilter from "../../helpers/contentFilter";
import { useNavigate } from "react-router-dom";

const Articles = () => {
    const navigate = useNavigate();
    const { fetchArticles, fetchCategories } = useFetchers();
    const { auth } = useContext(AppContext);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(12);
    const [filterOptions, setFilterOptions] = useState({
        wordToFind: "",
        filterByCategory: null,
        sortType: ""
    })

    useEffect(() => {
        getArticles();
        getCategories();
    }, [filterOptions]);

    const getArticles = async () => {
        const data = await fetchArticles();
        let articles = data;
        setArticles(contentFilter(articles, filterOptions));
    }

    const getCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
        for (let i = 0; i < articles.length; i++) {
            for (let j = 0; j < categories.length; j++) {
                var newCategories = [];
                if (articles[i].hasOwnProperty("categories")) newCategories = articles[i].categories;
                if (!newCategories.includes(categories[j]) && articles[i].hasOwnProperty("categoriesIds") && articles[i].categoriesIds !== null && articles[i].categoriesIds.includes(categories[j].id)) {
                    newCategories[newCategories.length] = categories[j];
                }
                articles[i] = { ...articles[i], categories: newCategories };
            }
        };
    }

    const handleArticlePerPageChange = (event) => setArticlesPerPage(event.target.value);
    const handleSortArticles = (event) => setFilterOptions({...filterOptions, sortType: event.target.value});
    const handleSearchArticles = (event) => setFilterOptions({...filterOptions, wordToFind: event.target.value});
    const handleCategoryButtonClick = (category) => { filterOptions.filterByCategory === category ? 
        setFilterOptions({...filterOptions, filterByCategory: null}) : setFilterOptions({...filterOptions, filterByCategory: categories.find((element) => element === category)})};

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    for (let i = 0; i < articles.length; i++) {
        for(let j=0; j<categories.length; j++){
            var newCategories = [];
            if(articles[i].hasOwnProperty("categories")) newCategories = articles[i].categories;
            if(!newCategories.includes(categories[j]) && articles[i].hasOwnProperty("categoriesIds") && articles[i].categoriesIds !== null && articles[i].categoriesIds.includes(categories[j].id)){
                newCategories[newCategories.length] = categories[j];
            }
            articles[i] = {...articles[i], categories: newCategories};
        }
    };

    return (
        <div className="container content">
            <div className="content__categories">
                <h1>Kategorie</h1>
                <ul>
                    {categories.length ? categories.map((category, index) => <li key={index}>
                            <Button className={index % 2 === 1 ? "btn--dark" : "btn--lighter"} onClick={() => handleCategoryButtonClick(category)}>{category.name}</Button>
                    </li>) : <h2>Brak kategorii do wyświetlenia</h2>}
                    {filterOptions.filterByCategory ? <li><Button onClick={() => setFilterOptions({...filterOptions, filterByCategory: null})}>Wszystkie kategorie</Button></li> : ""}
                </ul>
            </div>
            <div className="content__list">
                <h1>Artykuły {filterOptions.filterByCategory ? " w kategorii: " + filterOptions.filterByCategory.name : ""}</h1>
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
                    {auth ? <Button onClick={()=>navigate("/article/create")}>Utwórz nowy artykuł</Button> : <p>Zaloguj się aby móc dodawać artykuły</p>}
                </div>
                {currentArticles.length ? <ArticleList articles={currentArticles} /> : <h2 className="content__none">Brak artykułów do wyświetlenia</h2>}
                <Pagination postsPerPage={articlesPerPage} totalPosts={articles.length} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    )
}

export default Articles;

