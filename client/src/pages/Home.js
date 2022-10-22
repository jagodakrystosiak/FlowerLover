import React, { useEffect, useState } from "react";
import './../sass/style.scss';
import './Home.scss';
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Button from "../components/Button/Button";
import PostBox from "../components/PostBox/PostBox";
import PostsList from "../components/PostsList/PostsList";
import Pagination from '../components/Pagination/Pagination';
import Carousel from "../components/Carousel/Carousel";

function Home() {
    const [articles, setArticles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        getPosts();
        getArticles();
    }, []);

    const getPosts = () => {
        setLoading(true);
        let posts = [];
        for (let i = 0; i < 150; i++) {
            posts[i] = {
                title: "Post nr " + i,
                content: "Witam Czy wiedzą może państwo co to za szkodnik zaatakował tę monsterę? Liście bardzo poniszczone są, tracą barwę i dużo drobnych blizn (puntowych). Ja się go pozbyć?",
                author: "roslinki123",
                date: new Date(2022, 9, 22, 18, 10, 13),
                votes: 0,
                answers: 0,
                views: 5
            };
        };
        setPosts(posts);
        setLoading(false);
    }

    const getArticles = () => {
        let articles = [];
        for (let i = 0; i < 12; i++) {
            articles[i] = {
                title: "Artykuł nr" + i,
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sint reprehenderit illum enim eum. Odit sapiente numquam accusamus aut ratione.",
                img: "https://source.unsplash.com/random/1000x500?sig=" + i
            };
        };
        setArticles(articles);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className="mt-75"></div>
            <Carousel articles={articles} />
            <div className="container home">
                <div className="home__posts">
                    <h1>Najnowsze wpisy</h1>
                    <PostsList posts={currentPosts} loading={loading} />
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate} />
                </div>
                <div>
                    <div className="home__categories">
                        <h1>Najpopularniejsze kategorie</h1>
                        <ul>
                            <li><a href="/">Kategoria</a></li>
                            <li><a href="/">Kategoria</a></li>
                            <li><a href="/">Kategoria</a></li>
                            <li><a href="/">Kategoria</a></li>
                        </ul>
                    </div>
                    <div className="home__tags">
                        <h1>Najpopularniejsze tagi</h1>
                        <ul>
                            <li><Button className="btn btn--dark">Tag</Button></li>
                            <li><Button className="btn btn--dark">Tag</Button></li>
                            <li><Button className="btn btn--dark">Tag</Button></li>
                            <li><Button className="btn btn--dark">Tag</Button></li>
                            <li><Button className="btn btn--dark">Tag</Button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;