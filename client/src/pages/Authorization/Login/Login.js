import React, { useContext, useState } from "react";
import Button from "../../../components/Button/Button";
import AppContext from "../../../contexts/AppContext";
import FormErrors from "../../../components/FormErrors.js/FormErrors";
import "./../Authorization.scss";
import HttpClient from "../../../services/HttpClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AppContext);
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!userData.username) _errors.push('Nazwa użytkownika jest wymagana');
        if (!userData.password) _errors.push('Hasło jest wymagane');
        if (_errors.length) return setErrors(_errors);

        try {
            const data = {
                username: userData.username,
                password: userData.password
            };

            const response = await HttpClient().post('/api/login', new URLSearchParams(data));
            console.log(response.data.access_token);
            //setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            //setToken(response.data.token);
            //navigate('/');
        } catch (error) {
            setErrors(["Nieprawidłowy email lub hasło"]);
        }
    }

    return (
        <div className="container authorization authorization--login">
            <div className="authorization-form">
                <h1 className="authorization-form__heading">Logowanie</h1>
                <form onSubmit={onSubmit} className="authorization-form__form authorization-form__form--login">
                <FormErrors errors={errors} />
                    <div>
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input id="username" name="username" type="text" value={userData.username} onChange={(event) => setUserData({...userData, username: event.target.value})} placeholder="Wprowadź nazwę użytkownika"/>
                    </div>
                    <div>
                        <label htmlFor="password">Hasło:</label>
                        <input id="password" name="password" type="password" value={userData.password} onChange={(event) => setUserData({...userData, password: event.target.value})} placeholder="Wprowadź hasło"/>
                    </div>
                    <div><Button type="submit" className="btn--dark">Zaloguj się</Button></div>
                </form>
                <p className="authorization-form__rules">Nie masz konta w serwisie?
                    <a href="/register"> Zarejestruj się</a>
                </p>
            </div>
            <div className="authorization-info">
                <h1 className="authorization-info__heading">Co daje posiadanie konta w naszym serwisie?</h1>
                <ul className="authorization-info__list">
                    <li><div className="authorization-info__dot"></div> <p>Możliwość tworzenia wpisów na forum i komentowania wpisów innych użytkowników.</p></li>
                    <li><div className="authorization-info__dot"></div> <p>Możliwość zapisywania roślin do swojego profilu i szybki dostęp do informacji o pielęgnacji.</p></li>
                    <li><div className="authorization-info__dot"></div> <p>Możliwość śledzenia postępu rozwoju swojej rośliny.</p></li>
                </ul>
            </div>
        </div>
    )
}

export default Login;