import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import AppContext from "../../../contexts/AppContext";
import FormErrors from "../../../components/FormErrors/FormErrors";
import "./../Authorization.scss";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "../../../api/axios";

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AppContext);
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        setErrors([]);
    }, [userData])

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

            const response = await axios.post('/api/login', new URLSearchParams(data));
            console.log(response.data);
            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;
            const decoded = jwtDecode(accessToken);
            console.log(decoded);
            setAuth({ 
                username: userData.username, 
                roles: decoded?.roles, 
                access_token: accessToken,
                refresh_token: refreshToken
            });
            localStorage.setItem("auth", JSON.stringify({ 
                access_token: accessToken,
                refresh_token: refreshToken
            }));
            navigate('/');
        } catch (error) {
            if(!error?.response) setErrors(["Brak odpowiedzi serwera"])
            else if(error.response?.status === 400) setErrors(["Nie podano emaila lub hasła"])
            else if(error.response?.status === 401) setErrors(["Nieprawidłowy email lub hasło"])
            else setErrors(["Nie udało się zalogować, spróbuj ponownie później"]);
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

