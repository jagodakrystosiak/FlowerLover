import React, { useEffect, useState } from "react";
import './Home.scss';
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Button from "../../components/Button/Button";
import PostBox from "../../components/PostBox/PostBox";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from '../../components/Pagination/Pagination';
import Carousel from "../../components/Carousel/Carousel";

function Home() {
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
        getTags();
    }, []);

    const getPosts = () => {
        setLoading(true);
        let posts = [];
        for (let i = 0; i < 150; i++) {
            posts[i] = {
                id: i+1,
                title: "Post nr " + (i + 1),
                content: "Witam Czy wiedzą może państwo co to za szkodnik zaatakował tę monsterę? Liście bardzo poniszczone są, tracą barwę i dużo drobnych blizn (puntowych). Ja się go pozbyć?",
                author: "roslinki123",
                createDate: new Date(2022, 9, 22, 18, 10, 13)
            };
        };
        setPosts(posts);
        setLoading(false);
    }

    const getArticles = () => {
        let articles = [];
        for (let i = 0; i < 12; i++) {
            articles[i] = {
                id: i+1,
                title: "Artykuł nr" + (i + 1),
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.",
                img: "https://source.unsplash.com/random/1000x500?sig=" + i,
                createDate: new Date(2022, 9, 22, 18, 10, 13)
            };
        };
        setArticles(articles);
    }

    const getCategories = () => {
        let categories = [];
        for (let i = 0; i < 50; i++) {
            categories[i] = "Kategoria" + i;
        };
        setCategories(categories);
    }

    const getTags = () => {
        let tags = [];
        for (let i = 0; i < 50; i++) {
            tags[i] = "Tag" + i;
        }
        setTags(tags);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <Jumbotron articles={articles} articlesLenght={articles.length} />
            <div className="container home">
                <div className="home__posts">
                    <h1>Najnowsze wpisy</h1>
                    <PostsList posts={currentPosts} postsLenght={currentPosts.length} loading={loading} />
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate} />
                </div>
                <div className="home__sidebar">
                    <div className="home__categories">
                        <h1>Najpopularniejsze kategorie</h1>
                        <ul>
                            {categories.map((category, index) => <li><a href={"/" + index}>{category}</a></li>)}
                        </ul>
                    </div>
                    <div className="home__tags">
                        <h1>Najpopularniejsze tagi</h1>
                        <ul>
                            {tags.map((tag, index) => <li><Button className={index%3==1 ? "btn--dark" : "btn--lighter"}>{tag}</Button></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;