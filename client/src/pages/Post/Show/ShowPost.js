import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import './ShowPost.scss';
import FormErrors from "../../../components/FormErrors/FormErrors";
import AppContext from "../../../contexts/AppContext";
import useFetchers from "../../../hooks/useFetchers";
import useSenders from "../../../hooks/useSenders";
import dateConverter from "../../../helpers/dateConverter";

const ShowPost = () => {
    const { fetchPostById, fetchCommentById, fetchCategoryById } = useFetchers();
    const { sendComment } = useSenders();
    const { auth } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        content: "",
        postId: id,
        username: auth?.username
    });
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getPost();
    }, [id]);

    useEffect(() => {
        getComments();
        getCategories();
    }, [post]);


    const getPost = async () => {
        const data = await fetchPostById(id);
        setPost(data);
    };

    const getComments = async () => {
        let comments = [];
        for(let commentId of post.commentsIds){
            const data = await fetchCommentById(commentId);
            comments.push(data);
        }
        setComments(comments);
    }

    const getCategories = async () => {
        let categories = [];
        for(let categoryId of post.categoriesIds){
            const data = await fetchCategoryById(categoryId);
            categories.push(data);
        }
        setCategories(categories);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);

        if(comment.content === "") setErrors(["Komentarz nie może być pusty"])
        else {
            try {
                console.log(comment);
                await sendComment(comment);
                navigate("/post/" + id);
            } catch (error) {
                setErrors(["Nie udało się dodać komentarz, spróbuj ponownie później"])
            }
        }
    }

    return (
        <div className="container">
            {post ?
                <div className="post">
                    <div className="post__categories">
                        {categories.map((category) => <Button className="btn--light btn--small">{category.name}</Button>)}
                    </div>
                    <div className="post__box">
                        <p className="post__date">{dateConverter(post.createDate)}</p>
                        <p className="post__author"><span>{post.username}</span> pisze:</p>
                        {post?.username === auth?.username ? <Button className="btn--lighter" onClick={() => navigate("/post/edit/" + post?.id)}>Edytuj</Button> : ""}
                        <h2 className="post__title">{post.title}</h2>
                        <p className="post__content">{post.content}</p>
                        <h1>Komentarze</h1>
                        <div className="post-divide"></div>
                        {auth ? 
                        <form className="post__add-comment" onSubmit={onSubmit}>
                            <FormErrors errors={errors} />
                            <textarea onChange={(event) => setComment({...comment, content: event.target.value})} placeholder="Wprowadź komentarz ..."></textarea>
                            <Button type="submit" className="btn--light btn--small">Dodaj</Button>
                            <Button type="reset" className="btn--lighter btn--small">Anuluj</Button>
                        </form> : <p><a href="/login">Zaloguj się</a>, aby dodawać komentarze</p>}
                        {comments.length ?
                            <ul className="post__comments">
                                {comments.map((comment, index) =>
                                    <><li>
                                        <div className="post__comment-author"><span>{comment.username}</span> pisze:</div>
                                        <div className="post__comment-content">{comment.content}</div>
                                        <div className="post__comment-date">{dateConverter(comment.createDate)}</div>
                                    </li>
                                        <div className="comment-divide"></div></>
                                )}
                            </ul>
                            : <h2>Brak komentarzy</h2>}
                    </div>
                </div>
                : <h1>Loading ...</h1>}
        </div>
    )
}

export default ShowPost;