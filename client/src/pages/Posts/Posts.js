import React, { useEffect, useState } from "react";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from '../../components/Pagination/Pagination';
import Button from "../../components/Button/Button";
import './Posts.scss';
import Searchbar from "../../components/Searchbar/Searchbar";
import PostBox from "../../components/PostBox/PostBox";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [sortType, setSortType] = useState("");
    const [wordToFind, setWordToFind] = useState("");

    useEffect(() => {
        getPosts();
        getTags();
    }, [sortType, wordToFind]);

    const getPosts = () => {
        setLoading(true);
        let posts = [];
        for (let i = 0; i < 150; i++) {
            posts[i] = {
                id: i+1,
                title: "Post nr " + (i + 1),
                content: "Witam Czy wiedzą może państwo co to za szkodnik zaatakował tę monsterę? Liście bardzo poniszczone są, tracą barwę i dużo drobnych blizn (puntowych). Ja się go pozbyć?",
                author: "roslinki123",
                date: new Date(2000+i/10, 9, 22, 18, 10, 13)
            };
        };
        if(wordToFind != ""){
            let filteredPosts = [];
            let i=0;
            posts.forEach((post) => {
                if(post.title.includes(wordToFind) || post.content.includes(wordToFind)){
                    filteredPosts[i] = post;
                    i++;
                }
            });
            posts = filteredPosts;
        }
        setPosts(posts.sort(sortPosts));
        setLoading(false);
    }

    const getTags = () => {
        let tags = [];
        for (let i = 0; i < 50; i++) {
            tags[i] = "Tag" + i;
        }
        setTags(tags);
    }

    const sortPosts = (a, b) => {
        switch (sortType) {
            case 'title':
                if (a.title > b.title) return 1;
                else return -1;
                break;
            case 'newest':
                if (a.date.valueOf() < b.date.valueOf()) return 1;
                else return -1;
                break;
            case 'oldest':
                if (a.date.valueOf() > b.date.valueOf()) return 1;
                else return -1;
                break;
            default:
                if (a.date.valueOf() < b.date.valueOf()) return 1;
                else return -1;
                break;

        }
    }

    const handlePostsPerPageChange = (event) => setPostsPerPage(event.target.value);
    const handleSortPosts = (event) => setSortType(event.target.value);
    const handleSearchPosts = (event) => setWordToFind(event.target.value);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="container content">
            <div className="content__categories">
                <h1>Kategorie</h1>
                <ul>
                    {tags.map((tag, index) => <li><Button className={index % 3 == 1 ? "btn--dark" : "btn--lighter"}>{tag}</Button></li>)}
                </ul>
            </div>
            <div className="content__list">
                <h1>Posty</h1>
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
                </div>
                <PostsList posts={currentPosts} postsLenght={currentPosts.length} loading={loading} />
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate} />
            </div>

        </div>
    )
}

export default Posts;