import React, { useState } from "react";
import "./../Authorization.scss";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import FormErrors from "../../../components/FormErrors/FormErrors";
import axios from "../../../api/axios";

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        passwordAgain: ""
    })
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!userData.username) _errors.push('Nazwa użytkownika jest wymagana');
        if (userData.username && userData.username.length < 3) _errors.push('Nazwa użytkownika jest za krótka');
        if (!userData.password) _errors.push('Hasło jest wymagane');
        if (!userData.passwordAgain) _errors.push('Potwierdzenie hasła jest wymagane');
        if (userData.password !== userData.passwordAgain) _errors.push('Podane hasła nie są jednakowe');
        if (_errors.length) return setErrors(_errors);

        const data = {
            username: userData.username,
            email: userData.email,
            password: userData.password
        };

        try {
            await axios.post('/api/user/save', data);
            navigate('/login');
        } catch (error) {
            setErrors("Nie udało się utworzyć konta, spróbuj ponownie później");
        }
    };

    return (
        <div className="container authorization">
            <div className="authorization-form">
                <h1 className="authorization-form__heading">Rejestracja</h1>
                <form onSubmit={onSubmit} className="authorization-form__form">
                <FormErrors errors={errors} />
                    <div>
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input id="username" name="username" type="text" value={userData.username} onChange={(event) => setUserData({...userData, username: event.target.value})} placeholder="Wprowadź nazwę użytkownika"/>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input id="email" name="email" type="email" value={userData.email} onChange={(event) => setUserData({...userData, email: event.target.value})} placeholder="Wprowadź adres e-mail"/>
                    </div>
                    <div>
                        <label htmlFor="password">Hasło:</label>
                        <input id="password" name="password" type="password" value={userData.password} onChange={(event) => setUserData({...userData, password: event.target.value})} placeholder="Wprowadź hasło"/>
                    </div>
                    <div>
                        <label htmlFor="repeat_password">Powtórz hasło:</label>
                        <input id="repeat_password" name="repeat_password" type="password" value={userData.passwordAgain} onChange={(event) => setUserData({...userData, passwordAgain: event.target.value})} placeholder="Wprowadź hasło ponownie"/>
                    </div>
                    <div><Button type="submit" className="btn--dark">Zarejestruj się</Button></div>
                </form>
                <p className="authorization-form__rules">Klikając "Zarejestruj się" wyrażasz zgodę na nasze
                    <a href="/"> warunki korzystania z usługi</a>,
                    <a href="/"> politykę prywatności</a>,
                    <a href="/"> plitykę plików cookies</a>.
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

export default Register;