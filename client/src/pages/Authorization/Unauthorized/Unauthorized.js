import React from "react";
import "./Unauthorized.scss";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="container unauthorized">
            <h1>Nie masz dostępu do tej strony</h1>
            <Button className="btn--dark" onClick={() => navigate("/")}>Wróć do strony głównej</Button>
        </div>

    )
}

export default Unauthorized;