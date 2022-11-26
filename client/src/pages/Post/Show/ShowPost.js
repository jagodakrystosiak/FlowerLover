import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import './ShowPost.scss';
import useAxiosPrivate from "./../../../hooks/useAxiosPrivate";
import AppContext from "../../../contexts/AppContext";
import HttpClient from "../../../services/HttpClient";

const ShowPost = () => {
    const { auth } = useContext(AppContext);
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [commentsAuthor, setCommentsAuthors] = useState([]);

    useEffect(() => {
        getPost();
    }, [id]);


    const getPost = async () => {
        const { data } = auth ? await axiosPrivate.get("/posts/?postId=" + id) : await HttpClient().get("/posts/?postId=" + id);
        console.log(data);
        setPost(data);
        getComments();
    };

    const getComments = () => {
        setComments([
            {
                content: "Cursus risus at ultrices mi. Leo in vitae turpis massa. Faucibus turpis in eu mi bibendum neque. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. ",
                create_date: new Date(2000, 9, 22, 18, 10, 13)
            },
            {
                content: "Aenean et tortor at risus viverra adipiscing. Mattis rhoncus urna neque viverra justo nec ultrices dui sapien. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.",
                create_date: new Date(2000, 9, 22, 18, 10, 13)
            },
            {
                content: "xd",
                create_date: new Date(2000, 9, 22, 18, 10, 13)
            }
        ]);
        getCommentsAuthors();
    }

    const getCommentsAuthors = () => {
        setCommentsAuthors([
            {
                id: 2,
                username: "ania_kwas"
            },
            {
                id: 3,
                username: "kochamkwiaty"
            },
            {
                id: 4,
                username: "BeAtkA"
            }
        ])
    }

    const createDate = (object) => {
        let date = "";
        if (object != null && object.create_date != null) {
            date = object.create_date.getDate() + "."
                + object.create_date.getMonth() + "."
                + object.create_date.getFullYear() + "\t"
                + object.create_date.getHours() + ":"
                + object.create_date.getMinutes();
        }
        return date;
    }

    const onSubmit = async () => {
        const data = {
            content: comment,
            postId: id,
            username: auth.username
        }
        await axiosPrivate.post("/comment/new-comment", data);
    }

    return (
        <div className="container">
            {post !== null ?
                <div className="post">
                    <div className="post__categories">
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                    </div>
                    <div className="post__box">
                    <p className="post__date">{createDate(post)}</p>
                    <p className="post__author">{post.username} pisze:</p>
                    <h2 className="post__title">{post.title}</h2>
                    <p className="post__content">{post.content}</p>
                    <h1>Komentarze</h1>
                    <div className="post-divide"></div>
                    {auth ? <form className="post__add-comment" onSubmit={onSubmit}>
                        <textarea onChange={(event) => setComment(event.target.value)} placeholder="Wprowadź komentarz ..."></textarea>
                        <Button type="submit" className="btn--light btn--small">Dodaj</Button>
                        <Button type="reset" className="btn--lighter btn--small">Anuluj</Button>
                    </form>: <p>Zaloguj się, aby dodawać komentarze</p>}
                    {comments !== null && commentsAuthor !== null ?
                        <ul className="post__comments">
                            {comments.map((comment, index) =>
                                <><li>
                                    <div className="post__comment-author"><a href={"/user/" + commentsAuthor[index].id}>{commentsAuthor[index].username}</a> pisze:</div>
                                    <div className="post__comment-content">{comment.content}</div>
                                    <div className="post__comment-date">{createDate(comment)}</div>
                                </li>
                                    <div className="comment-divide"></div></>
                            )}
                        </ul>
                        : <h1>Brak komentarzy</h1>}
                    </div>
                </div>
                : <h1>Loading ...</h1>}
        </div>
    )
}

export default ShowPost;