import React from "react";
import './Card.scss';

function Card(props) {
    return (
        <div className="card">
            <div>
                <h2 className="card__heading">{props.title}</h2>
                <p className="card__text">{props.children}</p>
            </div>
        </div>
    )
}

export default Card;