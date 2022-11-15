import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import './ShowPost.scss';

const ShowPost = () => {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsAuthor, setCommentsAuthors] = useState([]);

    useEffect(() => {
        getPost();
    }, []);


    const getPost = () => {
        setPost({
            title: "Tytuł: Aenean et tortor at risus viverra adipiscing. Mattis rhoncus urna neque viverra justo nec ultrices dui sapien. Dolor magna eget.",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nullam non nisi est sit amet facilisis magna etiam. Fusce ut placerat orci nulla pellentesque dignissim. Felis eget nunc lobortis mattis aliquam faucibus purus. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Placerat orci nulla pellentesque dignissim enim sit. Bibendum enim facilisis gravida neque convallis. Id donec ultrices tincidunt arcu. Gravida in fermentum et sollicitudin ac orci. Praesent tristique magna sit amet purus gravida. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Quis vel eros donec ac odio tempor orci. Libero id faucibus nisl tincidunt eget nullam non nisi. Odio facilisis mauris sit amet massa vitae tortor condimentum. Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Sodales ut etiam sit amet nisl purus in mollis. Urna porttitor rhoncus dolor purus.",
            create_date: new Date(2000, 9, 22, 18, 10, 13)
        });
        getUser();
        getComments();
    };

    const getUser = () => {
        setUser({
            id: 1,
            username: "roslinki123"
        });
    }

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

    return (
        <div className="container">
            {post !== null && user != null ?
                <div className="post">
                    <div className="post__categories">
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                        <Button className="btn--light btn--small">Kategoria</Button>
                    </div>
                    <div className="post__box">
                    <p className="post__date">{createDate(post)}</p>
                    <p className="post__author"><a href={"/user/" + user.id}>{user.username}</a> pisze:</p>
                    <h2 className="post__title">{post.title}</h2>
                    <p className="post__content">{post.content}</p>
                    <h1>Komentarze</h1>
                    <div className="post-divide"></div>
                    <form className="post__add-comment">
                        <textarea placeholder="Wprowadź komentarz ..."></textarea>
                        <Button className="btn--light btn--small">Dodaj</Button>
                        <Button type="reset" className="btn--lighter btn--small">Anuluj</Button>
                    </form>
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