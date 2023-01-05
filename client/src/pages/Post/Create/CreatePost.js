import React, { useContext, useEffect, useState } from "react";
import AppContext from "./../../../contexts/AppContext";
import Button from "./../../../components/Button/Button";
import FormErrors from "../../../components/FormErrors/FormErrors.js";
import "./CreatePost.scss";
import { useNavigate } from "react-router-dom";
import useSenders from "../../../hooks/useSenders";
import useFetchers from "../../../hooks/useFetchers";

const CreatePost = () => {
    const { fetchCategories } = useFetchers();
    const { sendPost } = useSenders();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [post, setPost] = useState({
        status: 0,
        username: auth?.username,
        title: "",
        content: "",
        url: "",
        categoriesIds: []
    });

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!post.title) _errors.push('Tytuł jest wymagany');
        if (!post.content) _errors.push('Treść jest wymagana');
        if (post.categoriesIds.length < 1) _errors.push('Minimum jedna kategoria jest wymagana');
        if (_errors.length) return setErrors(_errors);

            try {
                await sendPost(post);
                navigate("/posts");
            } catch (error) {
                setErrors(["Nie udało sie utworzyć post, spróbuj ponownie później"])
            }
    }

    return (
        <div className="container createpost">
            <h1>Tworzenie posta</h1>
            <form className="createpost__form" onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div className="createpost__row">
                    <label htmlFor="title">Tytuł posta: </label>
                    <input id="title" type="text" placeholder="Wprowadź tytuł posta" value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} />
                </div>
                <div className="createpost__row">
                    <label htmlFor="content">Treść: </label>
                    <textarea name="content" id="content" placeholder="Wprowadź treść posta" cols="30" rows="10" value={post.content} onChange={(event) => setPost({ ...post, content: event.target.value })}></textarea>
                </div>
                <div className="createpost__row">
                    <label htmlFor="url">Link do zdjęcia: </label>
                    <input id="url" type="url" placeholder="Możesz tu umieścić link do zdjęcia z zewnętrznego serwera" value={post.url} onChange={(event) => setPost({ ...post, url: event.target.value })} />
                </div>
                <fieldset>
                    <legend>Kategorie</legend>
                    <div className="createpost__cartegories">
                        {categories ? categories.map((category) =>
                            <div>
                                <input id={category.name} type="checkbox" value={category.id} onChange={(event) => setPost({ ...post, categoriesIds: [...post.categoriesIds, +event.target.value] })} />
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                        ) : <></>}
                    </div>
                </fieldset>
                <div className="createpost__buttons">
                    <Button className="btn--light" type="submit">Dodaj post</Button>
                    <Button className="btn--dark" onClick={() => navigate("/posts")}>Wróć do postów</Button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;

