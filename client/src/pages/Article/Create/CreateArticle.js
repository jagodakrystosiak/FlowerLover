import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import useFetchers from "../../../hooks/useFetchers";
import FormErrors from "../../../components/FormErrors/FormErrors";
import Button from "../../../components/Button/Button";
import "./../../Post/Create/CreatePost.scss"
import useSenders from "../../../hooks/useSenders";

const CreateArticle = () => {
    const { sendArticle } = useSenders();
    const { auth } = useContext(AppContext);
    const navigate = useNavigate();
    const { fetchCategories } = useFetchers();
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [article, setArticle] = useState({
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

        if(!article.title) _errors.push('Tytuł jest wymagany');
        if(!article.content) _errors.push('Treść jest wymagana');
        if(article.categoriesIds.length<1) _errors.push('Minimum jedna kategoria jest wymagana');
        if (_errors.length) return setErrors(_errors);

        try {
            await sendArticle(article);
            navigate("/articles");
        } catch (error) {
            setErrors(["Nie udało sie utworzyć post, spróbuj ponownie później", error])
        }
    }

    return (
        <div className="container createpost">
            <h1>Tworzenie artykułu</h1>
            <form className="createpost__form" onSubmit={onSubmit}>
            <FormErrors errors={errors}/>
                <div className="createpost__row">
                    <label htmlFor="title">Tytuł posta: </label>
                    <input id="title" type="text" placeholder="Wprowadź tytuł posta" value={article.title} onChange={(event) => setArticle({...article, title: event.target.value})}/>
                </div>
                <div className="createpost__row">
                    <label htmlFor="content">Treść: </label>
                    <textarea name="content" id="content" placeholder="Wprowadź treść posta" cols="30" rows="10" value={article.content} onChange={(event) => setArticle({...article, content: event.target.value})}></textarea>
                </div>
                <div className="createpost__row">
                    <label htmlFor="url">Link do zdjęcia: </label>
                    <input id="url" type="url" placeholder="Możesz tu umieścić link do zdjęcia z zewnętrznego serwera" value={article.url} onChange={(event) => setArticle({...article, url: event.target.value})}/>
                </div>
                <fieldset>
                    <legend>Kategorie</legend>
                    <div className="createpost__cartegories">
                        {categories.map((category) =>
                            <div>
                                <input id={category.name} type="checkbox" value={category.id} onChange={(event) => setArticle({...article, categoriesIds: [...article.categoriesIds, +event.target.value]})}/>
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                        )}
                    </div>
                </fieldset>
                <div className="createpost__buttons">
                <Button className="btn--light" type="submit">Dodaj artykuł</Button>
                <Button className="btn--dark" onClick={() => navigate("/articles")}>Wróć do artykułów</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateArticle;