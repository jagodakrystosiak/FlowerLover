import React from "react";
import "./../Authorization.scss";
import Button from "../../../components/Button/Button";

const Register = () => {
    return (
        <div className="container authorization">
            <div className="authorization-form">
                <h1 className="authorization-form__heading">Rejestracja</h1>
                <form action="" className="authorization-form__form">
                    <div>
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input id="username" name="username" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Hasło:</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <div>
                        <label htmlFor="repeat_password">Powtórz hasło:</label>
                        <input id="repeat_password" name="repeat_password" type="password" />
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