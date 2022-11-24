import React, { useContext, useState } from "react";
import Button from "../../../components/Button/Button";
import AppContext from "../../../context/AppContext";
import "./../Authorization.scss";

const Login = () => {
    const { setUser } = useContext(AppContext);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!userData.username) _errors.push('Nazwa użytkownika jest wymagana');
        if (!userData.email) _errors.push('Adres e-mail jest wymagany');
        if (!userData.password) _errors.push('Hasło jest wymagane');
        if (_errors.length) return setErrors(_errors);

        try {
            console.log("try");
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }

    return (
        <div className="container authorization authorization--login">
            <div className="authorization-form">
                <h1 className="authorization-form__heading">Logowanie</h1>
                <form action="" className="authorization-form__form authorization-form__form--login">
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Hasło:</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <div><Button type="submit" className="btn--dark">Zaloguj się</Button></div>
                </form>
                <p className="authorization-form__rules">Nie masz konta w serwisie?
                    <a href="/"> Zarejestruj się</a>
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