import React, { useContext, useEffect, useState } from "react";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from '../../components/Pagination/Pagination';
import Button from "../../components/Button/Button";
import './Posts.scss';
import Searchbar from "../../components/Searchbar/Searchbar";
import AppContext from "../../contexts/AppContext";
import useFetchers from "../../hooks/useFetchers";
import contentFilter from "../../helpers/contentFilter";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const navigate = useNavigate();
    const { fetchPosts, fetchCategories } = useFetchers();
    const { auth } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [filterOptions, setFilterOptions] = useState({
        wordToFind: "",
        filterByCategory: null,
        sortType: ""
    })

    useEffect(()=>{
        getCategories();
    },[posts]);
    
    useEffect(() => {
        getPosts();
    }, [filterOptions]);

    const getPosts = async () => {
        const data = await fetchPosts();
        let posts = data;
        setPosts(contentFilter(posts, filterOptions));
    }

    const getCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
        
        //dodajemy do pobranych postów atrybut categories, który przechowuje tablice obiektów kategoria {id, name}
        //aby móc potem w łatwy sposób wyświetlić nazwy kategorii w używanych komponentach
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < categories.length; j++) {
                var newCategories = [];
                if (posts[i].hasOwnProperty("categories")) newCategories = posts[i].categories;
                if (!newCategories.includes(categories[j]) && posts[i].hasOwnProperty("categoriesIds") && posts[i].categoriesIds !== null && posts[i].categoriesIds.includes(categories[j].id)) {
                    newCategories[newCategories.length] = categories[j];
                }
                posts[i] = { ...posts[i], categories: newCategories };
            }
        };
    }


    const handlePostsPerPageChange = (event) => setPostsPerPage(event.target.value);
    const handleSortPosts = (event) => setFilterOptions({...filterOptions, sortType: event.target.value});
    const handleSearchPosts = (event) => setFilterOptions({...filterOptions, wordToFind: event.target.value});
    const handleCategoryButtonClick = (category) => { filterOptions.filterByCategory === category ? setFilterOptions({...filterOptions, filterByCategory: null}) : setFilterOptions({...filterOptions, filterByCategory: categories.find((element) => element === category)})};

    //ustawia numer aktualnej strony w paginacji
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //dzieli posty w zależności od podanej ilości postów na stronie oraz strony w paginacji
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                <h1>Posty {filterOptions.filterByCategory ? " w kategorii: " + filterOptions.filterByCategory.name : ""}</h1>
                <div className="content__filter">
                    <Searchbar onChange={(event) => handleSearchPosts(event)} />
                    <p>Sortuj
                        <select className="content__select" onChange={(event) => handleSortPosts(event)}>
                            <option value="newest">Najnowsze</option>
                            <option value="oldest">Najstarsze</option>
                            <option value="title">Tytuły</option>
                        </select>
                    </p>
                    <p>Pokaż
                        <select className="content__select" onChange={(event) => handlePostsPerPageChange(event)}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </p>
                    {auth ? <Button onClick={() => navigate("/post/create")}>Utwórz nowy post</Button> : <p>Zaloguj się aby móc dodawać posty</p>}
                </div>
                {currentPosts.length ? <PostsList posts={currentPosts} postsLenght={currentPosts.length} /> : <h2 className="content__none">Brak artykułów do wyświetlenia</h2>}
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    )
}

export default Posts;