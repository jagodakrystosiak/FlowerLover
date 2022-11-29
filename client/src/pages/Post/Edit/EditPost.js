import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Button from "../../../components/Button/Button";
import FormErrors from "../../../components/FormErrors/FormErrors";
import useFetchers from "../../../hooks/useFetchers";

const EditPost = () => {
    const { fetchCategories, fetchPostById } = useFetchers();
    const { id } = useParams();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [post, setPost] = useState(null);

    useEffect(() => {
        getCategories();
        getPost();
    }, []);

    const getCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    }

    const getPost = async () => {
        const data = await fetchPostById(id);
        setPost(data);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if(!post.title) _errors.push('Tytuł jest wymagany');
        if(!post.content) _errors.push('Treść jest wymagana');
        if(post.categoriesIds.length<1) _errors.push('Minimum jedna kategoria jest wymagana');
        if (_errors.length) return setErrors(_errors);

        try {
            await axiosPrivate.post("/posts/new-post/", post);
            navigate("/posts");
        } catch (error) {
            setErrors(["Nie udało sie utworzyć post, spróbuj ponownie później"])
        }
    }

    return (
        post ? (post?.username === auth?.username ? 
        <div className="container createpost">
            <h1>Edycja posta</h1>
            <form className="createpost__form" onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div className="createpost__row">
                    <label htmlFor="title">Tytuł posta: </label>
                    <input id="title" type="text" defaultValue={post.title} onChange={(event) => setPost({...post, title: event.target.value})}/>
                </div>
                <div className="createpost__row">
                    <label htmlFor="content">Treść: </label>
                    <textarea name="content" id="content" placeholder="Wprowadź treść posta" cols="30" rows="10" defaultValue={post.content} onChange={(event) => setPost({...post, content: event.target.value})}></textarea>
                </div>
                <div className="createpost__row">
                    <label htmlFor="url">Link do zdjęcia: </label>
                    <input id="url" type="url" placeholder="Możesz tu umieścić link do zdjęcia z zewnętrznego serwera" defaultValue={post.url} onChange={(event) => setPost({...post, url: event.target.value})}/>
                </div>
                <fieldset>
                    <legend>Kategorie</legend>
                    <div className="createpost__cartegories">
                        {categories.map((category) =>
                            <div>
                                <input id={category.name} type="radio" value={category.id} onChange={(event) => setPost({...post, categoriesIds: [...post.categoriesIds, +event.target.value]})}
                                checked={post?.categoriesIds.includes(category.id)}/>
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                        )}
                    </div>
                </fieldset>
                <div className="createpost__buttons">
                <Button className="btn--light" type="submit" onClick={() => window.location.reload()}>Zatwierdź</Button>
                <Button className="btn--dark" onClick={() => window.location.reload()}>Wróć do posta</Button>
                </div>
            </form>
        </div> : navigate("/unauthorized")) : ""
    )
};

export default EditPost;