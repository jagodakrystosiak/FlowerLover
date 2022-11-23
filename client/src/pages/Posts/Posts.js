import React, { useEffect, useState } from "react";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from '../../components/Pagination/Pagination';
import Button from "../../components/Button/Button";
import './Posts.scss';
import Searchbar from "../../components/Searchbar/Searchbar";
import PostBox from "../../components/PostBox/PostBox";
import HttpClient from "../../services/HttpClient";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [sortType, setSortType] = useState("");
    const [wordToFind, setWordToFind] = useState("");

    useEffect(() => {
        getCategories();
        getPosts();
    }, [sortType, wordToFind]);

    const getPosts = async () => {
        const { data } = await HttpClient().get('/posts/all');
        console.log({ data });
        let posts = data;
        if (wordToFind != "") {
            let filteredPosts = [];
            let i = 0;
            posts.forEach((post) => {
                if (post.title.includes(wordToFind) || post.content.includes(wordToFind)) {
                    filteredPosts[i] = post;
                    i++;
                }
            });
            posts = filteredPosts;
        }
        setPosts(posts.sort(sortPosts));
    }
    console.log(posts);

    const getCategories = async () => {
        const { data } = await HttpClient().get('/categories/all');
        let categories = data;
        setCategories(categories);
    }

    const sortPosts = (a, b) => {
        switch (sortType) {
            case 'title':
                if (a.title > b.title) return 1;
                else return -1;
            case 'newest':
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
            case 'oldest':
                if (a.createDate.valueOf() > b.createDate.valueOf()) return 1;
                else return -1;
            default:
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
        }
    }

    const handlePostsPerPageChange = (event) => setPostsPerPage(event.target.value);
    const handleSortPosts = (event) => setSortType(event.target.value);
    const handleSearchPosts = (event) => setWordToFind(event.target.value);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    for (let i = 0; i < posts.length; i++) {
        for(let j=0; j<categories.length; j++){
            var newCategories = [];
            if(posts[i].hasOwnProperty("categories")) newCategories = posts[i].categories;
            if(!newCategories.includes(categories[j]) && posts[i].hasOwnProperty("categoriesIds") && posts[i].categoriesIds !== null && posts[i].categoriesIds.includes(categories[j].id)){
                
                newCategories[newCategories.length] = categories[j];
                console.log("xd");
            }
            posts[i] = {...posts[i], categories: newCategories};
        }
    };

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