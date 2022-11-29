import React, { useEffect, useState } from "react";
import './Home.scss';
import Jumbotron from "./Jumbotron/Jumbotron";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from '../../components/Pagination/Pagination';
import useFetchers from "../../hooks/useFetchers";
import Button from "../../components/Button/Button";

const Home = () => {
    const { fetchPosts, fetchArticles, fetchCategories } = useFetchers();
    const [articles, setArticles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        getPosts();
        getArticles();
        getCategories();
    }, []);

    const getPosts = async () => {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data.sort((a, b) => a.createDate < b.createDate ? 1 : -1).slice(0,5));
        setLoading(false);
    }

    const getArticles = async () => {
        const data = await fetchArticles();
        setArticles(data);
    }

    const getCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    }

    return (
        <>
            {articles.length ? <Jumbotron articles={articles} articlesLenght={articles.length} /> : ""}
            <div className="container home">
                <div className="home__posts">
                    <h1>Najnowsze wpisy</h1>
                    <PostsList posts={posts} postsLenght={posts.length} loading={loading} />
                    <a className="home__more" href="/posts">Zobacz więcej postów</a>
                </div>
                <div className="home__sidebar">
                    <div className="home__categories">
                        <h1>Najpopularniejsze kategorie</h1>
                        <ul>
                            {categories ? categories.map((category, index) => <li><Button className={index%2==1 ? "btn--lighter" : "btn--dark"}>{category.name}</Button></li>)
                            : <p>Brak kategorii do wyświetlenia</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;